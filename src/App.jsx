import Map from './components/map/Map.jsx';
import Header from './components/header/Header.jsx';
import { Flex } from '@chakra-ui/react';
import './index.css'

export default function App() {
  return (
    <Flex className="App" h="100vh" direction="column" fontFamily={'body sans-serif'}>
      <Header />
      <Map />
    </Flex>
  );
}