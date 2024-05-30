from flask import Blueprint, request, jsonify
import openai
import os

bp = Blueprint('routes', __name__)

# Set OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

@bp.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text')
    # Use the OpenAI API for text summarization
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Summarize this text: {text}",
        max_tokens=50
    )
    summary = response.choices[0].text.strip()
    return jsonify({'summary': summary})
@bp.route('/', methods=['GET'])
def index():
    return 'Hello, World!'