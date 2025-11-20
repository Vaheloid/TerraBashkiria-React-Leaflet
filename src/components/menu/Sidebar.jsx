"use client"

import { Image, Button, CloseButton, Drawer, IconButton, Portal, VStack } from "@chakra-ui/react"
import { useState } from "react"

import { RxHamburgerMenu } from "react-icons/rx"
import { FaMapMarkedAlt } from "react-icons/fa"
import { GrUserAdmin } from "react-icons/gr";

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root placement="start" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Drawer.Trigger asChild>
        <IconButton aria-label="Search database" _focus={{boxShadow: "none",outline: "none",}}>
          <RxHamburgerMenu color="black" />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header bg={"#5C65BB"} paddingTop={"14"} paddingBottom={"14"}>
              <Drawer.Title><Image htmlWidth="300px" htmlHeight="200px" src="../src/images/logo1.png"  /></Drawer.Title>
            </Drawer.Header>
            <Drawer.Body py={4} bg={"#D3D8FF"}>
              <VStack spacing={5} align="stretch">
                <Button variant="subtle"
                  justifyContent={"flex-start"}
                  width="100%"
                >
                  <FaMapMarkedAlt size={"lg"}/>
                  Информационная карта
                </Button>
                
                <Button variant="subtle"
                  justifyContent={"flex-start"}
                >
                  <GrUserAdmin />
                  Администрирование
                </Button>
              </VStack>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild bg={"#7B83CE"}>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
