import unittest
from flask_testing import TestCase
from app import create_app
from unittest.mock import patch, MagicMock

class SummarizeTestCase(TestCase):
    def create_app(self):
        # Create the Flask app with the test configuration
        app = create_app()
        app.config.from_object('config.TestConfig')
        return app

    @patch('app.routes.openai.ChatCompletion.create')
    def test_summarize(self, mock_create):
        # Mock the OpenAI API response
        mock_response = {
            'choices': [{
                'message': {'content': 'Summary: Bruno is great.'}
            }]
        }

        mock_create.return_value = mock_response

        response = self.client.post('/summarize', json={'text': 'Bruno is a great request manager.'})
        print(response.json)  # Add print statement to see the response content
        self.assertEqual(response.status_code, 200)
        self.assertIn('summary', response.json)
        self.assertEqual(response.json['summary'], 'Summary: Bruno is great.')

    def test_no_text_provided(self):
        response = self.client.post('/summarize', json={})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json)
        self.assertEqual(response.json['error'], 'No text provided')

if __name__ == '__main__':
    unittest.main()
