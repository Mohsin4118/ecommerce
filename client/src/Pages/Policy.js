import React from 'react';
import Layout from '../Components/LayOuts/Layout';

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>

        <div className="text-gray-700 dark:text-gray-300 mb-6">
          <p>
            This privacy policy explains how we collect, use, and share your
            personal information when you use our website.
          </p>
        </div>

        <div className="text-gray-700 dark:text-gray-300 mb-6">
          <p>
            We collect the following personal information from you:
          </p>
          <ul className="list-disc ml-6">
            <li>Your name</li>
            <li>Your email address</li>
            <li>Your IP address</li>
          </ul>
        </div>

        <div className="text-gray-700 dark:text-gray-300 mb-6">
          <p>
            We use your personal information to:
          </p>
          <ul className="list-disc ml-6">
            <li>Provide you with access to our website</li>
            <li>Send you marketing communications</li>
            <li>Improve our website</li>
          </ul>
        </div>

        <div className="text-gray-700 dark:text-gray-300 mb-6">
          <p>
            We may share your personal information with the following third parties:
          </p>
          <ul className="list-disc ml-6">
            <li>Our email marketing provider</li>
            <li>Our website analytics provider</li>
          </ul>
        </div>

        <div className="text-gray-700 dark:text-gray-300 mb-6">
          <p>
            You have the right to access, correct, and delete your personal
            information. You also have the right to opt out of marketing
            communications.
          </p>
        </div>

        <div className="text-gray-700 dark:text-gray-300">
          <p>
            To exercise your rights, please contact us at{' '}
            <a href="mailto:email@example.com" className="text-blue-500 hover:underline">
              email@example.com
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
