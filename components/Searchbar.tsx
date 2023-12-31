"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";

const Searchbar = () => {

  const [searchPrompt, setSearchPrompt] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const isValidAmazonProductUrl = (url: string) => {
    try {
      const parsedURL = new URL(url);
      const hostname = parsedURL.hostname;

      if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.includes('amazon')) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductUrl(searchPrompt);

    if(!isValidLink) return alert('Please Provide a valid Amazon link')

    try {
      setIsLoading(true);
      
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter Product Link"
        className="searchbar-input"
      />
      <button type="submit" className="searchbar-btn" disabled={searchPrompt === ''}>
        {isloading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default Searchbar;
