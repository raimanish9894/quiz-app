# Quiz Application

This application offers users a seamless experience to attempt a quiz fetched from an external API and view their results.

## Table of Contents
- [Setup and Installation Guide](#setup-and-installation-guide)
- [Component Overview](#component-overview)
- [Application Overview](#application-overview)
- [Challenges Faced](#challenges-faced)

## Setup and Installation Guide

1. **Clone the Repository**
    ```bash
    git clone `https://github.com/raimanish9894/quiz-app.git`
    cd quiz-app
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Start the Development Server**
    ```bash
    npm start
    ```

    This will start the development server on `http://localhost:3000/`.

## Component Overview

- **`StartPage`**: This component displays the initial screen where users can start the quiz.
  
- **`Timer`**: Responsible for keeping track of the time and signaling when the quiz time is over.
  
- **`Question`**: Displays individual quiz questions and handles user's choices.
  
- **`OverviewPanel`**: Gives an overview of the questions, showing which ones have been answered, and allowing users to navigate between them.
  
- **`ReportPage`**: Displays a report of the user's answers and the correct answers after the quiz is completed.

- **`QuizContext`**: Provides state management for the application, storing information about current question, user's answers, and other relevant quiz state.

## Application Overview

The application starts with a `StartPage` where the user can initiate the quiz. Once started, the user is presented with a series of questions fetched from an external API. The user can navigate between questions, choose answers, and view the time remaining through the `Timer` component. The `OverviewPanel` offers a quick glance at the questions, showing which ones have been visited and answered. After answering all questions or when the timer runs out, the user is taken to the `ReportPage` where they can review their performance.

## Challenges Faced

1. **State Management**: Managing the state for current questions, user answers, and navigation was a primary challenge. The `QuizContext` was used to centralize the state and provide a structured way to update and read from it.

2. **Fetching and Formatting Questions**: Questions fetched from the API came in a format that needed restructuring for the application. Choices for each question were randomized and formatted for display.

3. **Navigation and Completion Logic**: Ensuring that the user can navigate between questions, and deciding when to move the user to the report section based on their answers or timer expiration, required careful logic and state checks.

4. **Design and Responsiveness**: The application needed to be both visually appealing and responsive. Making sure it looked good and functioned well on various screen sizes was another challenge faced.
