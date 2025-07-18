const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "How did you hear about us";
let fullname = "Enter your full name";
let email = "Enter your email";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <h2>Sign Up</h2>
  <label>${fullname}</label>
  <input name="fullname"></input>
  <br>
  <label>${email}</label>
  <input name="email"></input>
  <br>
  <label>${item}</label>
  <select id="sourse" name="sourse">
  <option value="default"></option>
  <option value="google">Google Search</option>
  <option value="linkedin">LinkedIn</option>
  <option value="glassdoor">Glassdoor</option>
  <option value="indeed">Indeed</option>
  </select>
  <form method="POST">
  <button type="submit">Register</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (!body["item"] || !body["fullname"] || !body["email"]) {
        item = "Required field"
        fullname = "Required field"
        email = "Required field"
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/sign_up",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});


server.listen(3000);
console.log("The server is listening on port 3000.");
