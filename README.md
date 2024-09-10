# Control Freak - Music Room Control App

Control Freak is a web application that allows users to create and join music rooms, where they can collaboratively control music playback. This project is built using Django for the backend and React for the frontend.

## Features

- Create music rooms with customizable settings
- Join existing rooms using a unique room code
- Control music playback (play/pause) based on room settings
- Vote to skip songs
- Responsive design using Material-UI components

## Tech Stack

- **Backend**: Django, Django REST Framework
- **Frontend**: React, Material-UI
- **Build Tools**: Webpack, Babel
- **Package Manager**: npm

## Project Structure

The project is organized into two main parts:
1. Django backend (api app)
2. React frontend (frontend app)

## Setup and Installation

1. Clone the repository
2. Set up a virtual environment and activate it
3. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Navigate to the frontend directory:
   ```
   cd frontend
   ```
5. Install JavaScript dependencies:
   ```
   npm install
   ```
6. Build the frontend:
   ```
   npm run build
   ```

## Running the Application

1. Start the Django development server:
   ```
   python manage.py runserver
   ```
2. Open a web browser and navigate to `http://localhost:8000`

## Key Components

### Backend
- **Room model**: Defines the structure of a music room
- **API views**: Handle room creation, joining, and user status

### Frontend
- **HomePage**: The main landing page
- **CreateRoomPage**: Allows users to create a new room
- **RoomJoinPage**: Enables users to join an existing room
- **Room**: Displays room information and controls

## Configuration

The project uses environment variables for sensitive information. Make sure to set up a `.env` file with the necessary variables, such as `SECRET_KEY`.

## Development

For frontend development, you can use the following command to watch for changes and rebuild automatically:
