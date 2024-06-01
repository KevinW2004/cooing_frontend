from flask import Flask, request, jsonify, render_template
import ollama
import logging

app = Flask(__name__)
client = ollama.Client(host="http://localhost:11434")
logging.basicConfig(level=logging.DEBUG)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    logging.debug(f"Received user input: {user_input}")
    try:
        response = client.chat(
            model="llama3",
            messages=[
                {
                    "role": "user",
                    "content": user_input,
                },
            ],
        )
        logging.debug(f'Response from Llama3: {response["message"]["content"]}')
        return jsonify({"response": response["message"]["content"]})
    except Exception as e:
        logging.error(f"Error: {e}")
        return jsonify({"response": "There was an error processing your request."})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001, use_reloader=False)
