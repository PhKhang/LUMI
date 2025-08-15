"use client"

import { Box, Flex, VStack, HStack, Text, Button, Icon } from "@chakra-ui/react"
import { 
  MdLogout,
  MdChevronLeft,
  MdChevronRight
} from "react-icons/md"
import { 
  FiHome,
  FiFilePlus,
  FiFileText,
  FiTrendingUp
} from "react-icons/fi"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"
import { useEffect } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { setColorMode } = useColorMode(); 

  useEffect(() => {
    setColorMode("light");
  }, []);

  const sidebarItems = [
    { icon: FiHome, label: "Dashboard", href: "/admin" },
    { icon: FiFilePlus, label: "Create Exam", href: "/admin/exams" },
    { icon: FiFileText, label: "View Exams", href: "/admin/view-exams" },
    { icon: FiTrendingUp, label: "Statistics", href: "/admin/statistics" },
  ]

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const isActiveRoute = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box
        w={isCollapsed ? "80px" : "280px"}
        bg="background.secondary"
        borderRight="1px"
        borderColor="border.primary"
        p={4}
        transition="width 0.3s ease"
        position="relative"
      >
        {/* Toggle Button */}
        <Button
          position="absolute"
          top="20px"
          right="-12px"
          w="24px"
          h="24px"
          borderRadius="full"
          bg="background.primary"
          border="1px solid"
          borderColor="border.primary"
          zIndex={10}
          onClick={toggleSidebar}
          p={0}
          minW="auto"
          _hover={{ bg: "background.accent" }}
        >
          <Icon as={isCollapsed ? MdChevronRight : MdChevronLeft} w={4} h={4} color="text.primary"/>
        </Button>

        {/* Logo */}
        <HStack mb={8} justify={isCollapsed ? "center" : "flex-start"} px={isCollapsed ? 0 : 4}>
          {isCollapsed ? (
            <Box w={10} h={10} display="flex" alignItems="center" justifyContent="center">
              <img
                src="/favicon.png"
                alt="LUMI Logo"
                style={{ height: "24px", width: "24px", objectFit: "contain" }}
              />
            </Box>
          ) : (
            <HStack>
              <img 
                src="/horizontal-logo.svg" 
                alt="LUMI Logo" 
                style={{ height: "32px" }}
              />
            </HStack>
          )}
        </HStack>

        {/* Navigation */}
        <VStack gap={2} align="stretch">
          {sidebarItems.map((item) => {
            const isActive = isActiveRoute(item.href)
            
            return (
              <Link key={item.href} href={item.href}>
                <Box
                  p={3}
                  borderRadius="md"
                  bg={isActive ? "primary" : "transparent"}
                  color={isActive ? "black" : "text.secondary"}
                  _hover={{ 
                    bg: isActive ? "primary" : "background.accent",
                    color: isActive ? "black" : "text.primary"
                  }}
                  cursor="pointer"
                  transition="all 0.2s ease"
                  display="flex"
                  alignItems="center"
                  justifyContent={isCollapsed ? "center" : "flex-start"}
                >
                  <Icon as={item.icon} w={5} h={5} />
                  {!isCollapsed && (
                    <Text ml={3} fontSize={"md"} fontWeight={isActive ? "semibold" : "medium"}>
                      {item.label}
                    </Text>
                  )}
                </Box>
              </Link>
            )
          })}
        </VStack>

        {/* User Section */}
        <Box position="absolute" bottom="4" left="4" right="4">
          {!isCollapsed && (
            <>
              <HStack
                p={3}
                borderRadius="md"
                bg="background.accent"
                mb={2}
              >
                <Box
                  w={8}
                  h={8}
                  bg="blue.500"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontSize="sm"
                  fontWeight="bold"
                >
                  U
                </Box>
                <Text fontSize="sm" fontWeight="medium" color="text.primary">
                  Uyển Nhi
                </Text>
              </HStack>
            </>
          )}
          
          {/* Logout */}
          <Box
            p={3}
            borderRadius="md"
            _hover={{ bg: "red.50", color: "red.600" }}
            cursor="pointer"
            color="text.secondary"
            transition="all 0.2s ease"
            display="flex"
            alignItems="center"
            justifyContent={isCollapsed ? "center" : "flex-start"}
          >
            <Icon as={MdLogout} w={5} h={5} />
            {!isCollapsed && (
              <Text font="lg" ml={3} fontWeight="medium">
                Logout
              </Text>
            )}
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex="1" bg="background.primary">
        {/* Content */}
        <Box p={6}>
          {children}
        </Box>
      </Box>
    </Flex>
  )
}
