## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

1. What is the purpose of using _sessions_?
   `Sessions` are web resources used to store client information from the server. It can be used for authentication and persisting data.
1. What does bcrypt do to help us store passwords in a secure manner.
   `Bcrypt` encrypts the passwords by running it through a hashing function several times `(salt rounds)` and then appending a randomly generated string `(salt)`
1. What does bcrypt do to slow down attackers?
   Bcrypt slow down attackers by looping the password a huge number of times thus increasing the `salt rounds`.
1. What are the three parts of the JSON Web Token?
   a. `payload`
   b. `Signature`
   c. `Header`
