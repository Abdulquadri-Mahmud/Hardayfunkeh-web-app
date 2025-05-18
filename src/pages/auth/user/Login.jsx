import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { signinFailure, signinStart, signinSuccess } from "../../../store/userReducers";
import { Box, Button, Flex, Heading, Input, Spinner, Text, VStack } from "@chakra-ui/react";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      dispatch(signinStart());

      const response = await fetch("https://hardayfunkeh-apis.vercel.app/api/user/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success === false) {
        setError(data.message || "Invalid email or password");
        dispatch(signinFailure(data.message));
        return;
      }

      dispatch(signinSuccess(data));
      navigate(-1);
    } catch (err) {
      setError("Network error. Please try again later.");
      dispatch(signinFailure(err || "Network error. Please try again later."));
    }
  };

  return (
    <div>
      <Header />
        <Flex align="center" justify="center" py={10} bg="gray.100" px={4}>
          <Box bg="white" p={8} rounded="lg" w="full" maxW="md">
            <Heading as="h2" size="lg" textAlign="center" color="gray.800" mb={2}>
              Welcome Back
            </Heading>
            <Text textAlign="center" color="gray.600" mb={6}>
              Login to continue shopping.
            </Text>

            <form onSubmit={handleLogin}>
              <VStack spacing={5} align="stretch">
                {/* Email Field */}
                <Box isRequired>
                  <Text color="gray.700" fontWeight="semibold">Email</Text>
                  <Input color={'gray.800'} py={6} type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} focusBorderColor="green.500" borderColor="gray.300" _hover={{ borderColor: "green.500" }} _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px rgba(254, 176, 23, 1)" }}/>
                </Box>

                {/* Password Field */}
                <Box isRequired mt={2}>
                  <Text color="gray.700" fontWeight="semibold">Password</Text>
                  <Box position="relative">
                    <Input color={'gray.800'} py={6} type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} focusBorderColor="green.500" borderColor="gray.300" _hover={{ borderColor: "green.500" }} _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px rgba(254, 176, 23, 1)" }}/>
                    <Button position="absolute" right="0" top="50%" transform="translateY(-50%)" variant="ghost" onClick={togglePasswordVisibility} color="gray.600" _hover={{ color: "green.500" }} >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </Box>
                </Box>

                {/* Error Message */}
                {error && (
                  <Text color="red.500" fontSize="sm" textAlign="left">
                    {error}
                  </Text>
                )}

                {/* Forgot Password Link */}
                <Box w="full" mt={3} textAlign="right">
                  <Link to="/forgot_password">
                    <Text fontSize="sm" color="red.500" fontWeight="medium" textDecoration="underline" className="">
                      Forgot Password
                    </Text>
                  </Link>
                </Box>
                {/* Submit Button */}
                <Button type="submit" mt={3} w="full" bg="green.500" color="white" fontWeight="semibold" py={6} fontSize="lg" _hover={{ opacity: 0.9 }}>
                  {loading ? (
                    <>
                      <Spinner size="sm" mr={2} />
                      Authenticating...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                {/* Signup Link */}
                <Text textAlign="start" fontSize={14} mt={2} color="gray.500">
                  Don't have an account?{" "}
                  <Text as="span" color="green.500" fontWeight="semibold" cursor="pointer" _hover={{ textDecoration: "underline" }} onClick={() => navigate("/signup")}>
                    Sign up
                  </Text>
                </Text>
              </VStack>
            </form>

          </Box>
        </Flex>

      <Footer />
    </div>
  );
}
