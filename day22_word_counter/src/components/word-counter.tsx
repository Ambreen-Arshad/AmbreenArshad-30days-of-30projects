"use client"; // Enables client-side rendering for this component
import React, { useState, ChangeEvent } from "react"; // Import useState and ChangeEvent from React
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"; // Import custom Card components
import { Textarea } from "@/components/ui/textarea"; // Import custom Textarea component
import { Button } from "@/components/ui/button"; // Import custom Button component

export default function WordCounter() {
  // State to manage the input text
  const [text, setText] = useState<string>("");

  // Function to handle text input changes
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  // Function to clear the input text
  const clearText = () => {
    setText("");
  };

  // Calculate word count
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;

  // Calculate character count
  const charCount = text.length;

  // JSX return statement rendering the Word Counter UI
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-blue-700">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center justify-center flex flex-col bg-neutral-700">
          <CardTitle className="text-white">Text Analysis</CardTitle>
          <CardDescription className="text-white">
            Enter text and see the word and character count.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 bg-neutral-600">
          {/* Textarea for input text */}
          <Textarea
            id="text-input"
            placeholder="Enter your text here..."
            className="h-32 resize-none bg-slate-300"
            value={text}
            onChange={handleTextChange}
          />
          {/* Display word and character count */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span id="word-count">{wordCount}</span> words,{" "}
              <span id="char-count">{charCount}</span> characters
            </div>
            {/* Button to clear the input text */}
            <Button onClick={clearText}>Clear</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}