const greeting = `<html lang="en">
  <head>
    <style>
      body {
        background-color: #f0f0f0;
        font-family: "Trebuchet MS";
      }
      h1 {
        color: white;
        text-align: center;
      }
      p,
      a {
        text-align: center;
        text-decoration: none;
      }
      a:hover {
        color: red;
      }
      .mid {
        background-color: orange;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-top: 25%;
        height: 100px;
        border-radius: 20px;
      }
    </style>
  </head>
  <body>
    <div class="mid">
      <h1>Hi! Welcome to my Post-it API!</h1>
      <p>
        <a href="https://justpostit-2v8i.onrender.com/api/v1/docs"
          >Click to view API Documentation</a
        >
      </p>
    </div>
  </body>
</html>
`;

module.exports = greeting;