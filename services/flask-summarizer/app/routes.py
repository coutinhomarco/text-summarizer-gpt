from flask import Blueprint, request, jsonify
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

bp = Blueprint('routes', __name__)

@bp.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    try:
        # Use the OpenAI API for text summarization
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Summarize this text: {text}"}
            ],
            max_tokens=350
        )
        summary = response['choices'][0]['message']['content'].strip()
        return jsonify({'summary': summary})
    except Exception as e:
        print(f"Exception: {e}")  # Add print statement to log the exception
        return jsonify({'error': str(e)}), 500

@bp.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})
