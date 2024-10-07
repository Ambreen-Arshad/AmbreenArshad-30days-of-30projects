"use client"; // Enables client-side rendering for this component

import React, { useState } from "react"; // Import React and useState hook
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component
import { CopyIcon } from "lucide-react"; // Import CopyIcon from lucide-react
import axios from "axios"; // Import axios for HTTP requests

const BITLY_API_URL = "https://api-ssl.bitly.com/v4/shorten";
const BITLY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_BITLY_ACCESS_TOKEN;

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState<string>(""); // State to manage the long URL input
  const [shortUrl, setShortUrl] = useState<string>(""); // State to manage the shortened URL
  const [error, setError] = useState<string>(""); // State to manage error messages

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state
    setShortUrl(""); // Reset shortened URL state

    try {
      const response = await axios.post(
        BITLY_API_URL,
        {
          long_url: longUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${BITLY_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShortUrl(response.data.link); // Set the shortened URL state with the response data
    } catch (err) {
        console.error(err); // Log the error for debugging
        setError("Failed to shorten the URL. Please try again.");
      }
  };

  // Function to handle copying the shortened URL to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Successfully Copied the Short URL!"); // Alert user that the URL has been copied
  };

  // JSX return statement rendering the URL Shortener UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-950 to-yellow-400">
      <div className="max-w-md w-full space-y-4 p-6 rounded-lg bg-green-950 shadow-lg">
        <div className="space-y-2 text-center bg-yellow-200">
          <h1 className="text-3xl font-bold underline">URL Shortener</h1>
          <p className="text-muted-foreground ">
            Paste your long URL and get a short, shareable link.
          </p>
        </div>
        {/* Form to input and submit the long URL */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative ">
            <Input
              type="url"
              placeholder="Paste your long URL here"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="pr-16 bg-yellow-200"
              required
            />
            <Button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-yellow-700"
            >
              Shorten
            </Button>
          </div>
          {/* Display error message if any */}
          {error && <div className="text-white text-center">{error}</div>}
          {/* Display the shortened URL and copy button */}
          {shortUrl && (
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="cursor-pointer"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted/50"
                onClick={handleCopy}
              >
                <CopyIcon className="w-5 h-5" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}