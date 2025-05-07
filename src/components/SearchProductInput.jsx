import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function SearchProductInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

  // Load search history from localStorage
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, []);

  // Toggle search input visibility
  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    // Save search to history
    const updatedHistory = [query, ...searchHistory.filter((item) => item !== query)].slice(0, 5); // Keep last 5 searches
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    // Navigate to the search page
    navigate(`/search?query=${query}`);

    // Clear search input
    setQuery("");
  };

  // Handle query input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filter search history for suggestions
    if (value.trim() !== "") {
      const suggestions = searchHistory.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Select a suggestion
  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
  };

  // Clear search history
  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
    setFilteredSuggestions([]);
  };

  return (
    <Flex position="fixed" zIndex={30} alignItems="center" mt={10}>
      {/* Search Icon Button */}
      <Box
        onClick={toggleSearch}
        w="40px"
        h="40px"
        bg="pink.600"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRightRadius="full"
        cursor="pointer"
        zIndex={30}
      >
        <Box aria-label="Search" color="gray.100"
          _hover={{ color: "yellow.400" }}><FaSearch size={20} /></Box>
      </Box>

      {/* Search Input */}
      {isOpen && (
        <Box
          position="absolute"
          left="10"
          zIndex={10}
          bg="white"
          rounded="md"
          w="16rem"
          display="flex"
          flexDirection="column"
        >
          <form onSubmit={handleSearch}>
            <Flex>
              <Input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for products"
                px={4}
                py={2}
                color={'gray.600'}
                border="1px solid"
                borderColor="gray.300"
                borderLeftRadius="md"
                _focus={{ outline: "none", boxShadow: "outline" }}
                autoFocus
              />
              <Button
                type="submit"
                bg="yellow.400"
                fontWeight="semibold"
                color="white"
                px={4}
                py={2}
                borderRightRadius="md"
                _hover={{ bg: "yellow.500" }}
              >
                Go
              </Button>
            </Flex>
          </form>

          {/* Clear History Button */}
          {searchHistory.length > 0 && (
            <Box
              bg="pink.100"
              roundedBottom="2xl"
              position="absolute"
              bottom="-7.2rem"
              w="full"
            >
              <VStack spacing={0} align="stretch">
                {filteredSuggestions.map((item, index) => (
                  <Box
                    key={index}
                    px={4}
                    py={2}
                    _hover={{ bg: "gray.100" }}
                    cursor="pointer"
                    onClick={() => selectSuggestion(item)}
                  >
                    {item}
                  </Box>
                ))}
                <Button
                  variant="ghost"
                  color="red.500"
                  fontSize="sm"
                  px={4}
                  py={2}
                  onClick={clearHistory}
                  _hover={{ textDecoration: "underline" }}
                >
                  Clear Search History
                </Button>
              </VStack>
            </Box>
          )}
        </Box>
      )}
    </Flex>
  );
}
