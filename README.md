# Flask Minimal App

This project is a minimal Flask application designed for a DevOps assignment. The app demonstrates integration with Docker, connects to a database, and handles data using JSON files. It includes basic API endpoints for health checks and data operations, and comes with a test suite using pytest to verify functionality. The setup instructions and included files make it easy to run and test the application in a Windows PowerShell environment.


## Run the App

1. **Clone the repository**  
    `git clone <repository-url>`

2. **Navigate to the project directory**  
    `cd Docker_Test_V4`

3. **Build and run with Docker**  
    ```
    docker build -t flask-minimal-app .
    docker run -p 5000:5000 flask-minimal-app
    ```

4. **Access the app**  
    Open your browser and go to [http://localhost:5000](http://localhost:5000)

5. **Run tests (optional)**  
    ```
    pip install -r requirements.txt
    pytest
    ```