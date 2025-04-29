import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useOutsideClick } from "@chakra-ui/react-use-outside-click";

const SearchInputField = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const ref = React.useRef();

  useOutsideClick({
    ref: ref,
    handler: () => setShowSuggestions(false),
  });

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setSuggestions(savedSearches);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const updatedSearches = [query, ...suggestions.filter((q) => q !== query)].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      setSuggestions(updatedSearches);
      navigate(`/search?query=${query}`);
      setQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    navigate(`/search?query=${suggestion}`);
    setShowSuggestions(false);
  };

  return (
    <Box position="relative" ref={ref}>
      <form onSubmit={handleSearch} style={{ display: 'flex' }}>
        <Input value={query} onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }} placeholder="Search for products" bg="white" borderRightRadius={0} height={'45px'} color={'gray.800'} border={0}/>
        <Button type="submit" bg="yellow.400" color={'white'} height={'45px'} borderLeftRadius={0}>
          Search
        </Button>
      </form>

      {query && showSuggestions && suggestions.length > 0 && (
        <Box position="absolute" top="100%" left={0} right={0} bg="white" border="1px solid" borderColor="gray.200" rounded="md" shadow="md" zIndex="popover" mt={1}>
          <List spacing={1}>
            {suggestions
              .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
              .map((s, index) => (
                <ListItem key={index} px={4} py={2} _hover={{ bg: "gray.100", cursor: "pointer" }} onClick={() => handleSuggestionClick(s)}>
                  {s}
                </ListItem>
              ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchInputField;
