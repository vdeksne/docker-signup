from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy # type: ignore
import os


db = SQLAlchemy()


def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)

    # Configure database: prefer DATABASE_URL env var.
    # When running in Docker Compose we provide a secret file at /run/secrets/db-password
    # containing the Postgres password. If DATABASE_URL is not set, try to read the
    # secret and construct a DATABASE_URL that points to the 'db' service.
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        secret_path = "/run/secrets/db-password"
        if os.path.exists(secret_path):
            try:
                with open(secret_path, "r") as f:
                    pwd = f.read().strip()
                # user postgres, DB name 'example', host 'db' (service name in compose)
                database_url = f"postgresql://postgres:{pwd}@db:5432/example"
            except Exception:
                database_url = None

    if database_url:
        app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    else:
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)


    class User(db.Model):
        __tablename__ = "users"
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(128), nullable=False)
        email = db.Column(db.String(256), nullable=False, unique=True)

        def to_dict(self):
            return {"id": self.id, "name": self.name, "email": self.email}


    # Ensure database tables exist. Some Flask versions don't support
    # the before_first_request decorator in the same way in WSGI workers,
    # so create tables immediately inside an application context.
    with app.app_context():
        db.create_all()


    @app.route("/")
    def index():
        return jsonify({"message": "Hello from Flask app"})


    @app.route("/health")
    def health():
        return jsonify({"status": "ok"})


    # CRUD endpoints for users - list users JSON, create user, update user, delete user
    @app.route("/api/users", methods=["GET"])
    def list_users():
        users = User.query.order_by(User.id).all()
        return jsonify([u.to_dict() for u in users])


    @app.route("/api/users", methods=["POST"])
    def create_user():
        data = request.get_json() or {}
        name = data.get("name")
        email = data.get("email")
        if not name or not email:
            return abort(400, description="name and email are required")

        # check unique email
        if User.query.filter_by(email=email).first():
            return abort(409, description="email already registered")

        user = User(name=name, email=email)
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201


    @app.route("/api/users/<int:user_id>", methods=["PUT"])
    def update_user(user_id):
        user = User.query.get_or_404(user_id)
        data = request.get_json() or {}
        name = data.get("name")
        email = data.get("email")
        if name:
            user.name = name
        if email:
            # ensure new email is unique
            existing = User.query.filter_by(email=email).first()
            if existing and existing.id != user.id:
                return abort(409, description="email already registered")
            user.email = email
        db.session.commit()
        return jsonify(user.to_dict())


    @app.route("/api/users/<int:user_id>", methods=["DELETE"])
    def delete_user(user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"status": "deleted"})


    return app


# Expose the app for running and for tests
app = create_app()


if __name__ == "__main__":
    # Use 0.0.0.0 so the app is reachable from containers/other hosts if needed
    app.run(host="0.0.0.0", port=5000, debug=True)
