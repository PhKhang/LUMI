"use client"

import { Box, Text, SimpleGrid, HStack, Icon, Button } from "@chakra-ui/react"
import { MdPeople, MdAssignment, MdBarChart, MdTrendingUp } from "react-icons/md"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Admin Dashboard
      </Text>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <HStack>
            <Icon as={MdPeople} boxSize={6} color="blue.500" />
            <Text fontWeight="bold">Users</Text>
          </HStack>
        </Box>
        
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <HStack>
            <Icon as={MdAssignment} boxSize={6} color="green.500" />
            <Text fontWeight="bold">Exams</Text>
          </HStack>
        </Box>
        
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <HStack>
            <Icon as={MdBarChart} boxSize={6} color="purple.500" />
            <Text fontWeight="bold">Statistics</Text>
          </HStack>
        </Box>
        
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <HStack>
            <Icon as={MdTrendingUp} boxSize={6} color="orange.500" />
            <Text fontWeight="bold">Reports</Text>
          </HStack>
        </Box>
      </SimpleGrid>
    </Box>
  )
}
