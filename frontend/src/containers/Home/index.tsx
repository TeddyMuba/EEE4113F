import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import moment from "moment";
import io from "socket.io-client";
import { WEB_SOCKET_HOST } from "../../constants";
import { MotionEventData } from "../../types";
import {
  AccordionCard,
  EmptyListHandler,
  ExcelDownloader,
  ListPair,
  Nav,
} from "../../components";
import { FaExclamationTriangle, FaImage } from "react-icons/fa";

const Home: React.FC = () => {
  const [data, setData] = React.useState<MotionEventData>();
  const [isSocketConnected, setIsSocketConnected] = React.useState(false);

  React.useEffect(() => {
    const socket = io(WEB_SOCKET_HOST, {
      transports: ["websocket"],
    });

    socket.emit("join");
    socket.on("connect", () => {
      setIsSocketConnected(true);
    });
    socket.on("disconnect", () => {
      setIsSocketConnected(false);
    });
    socket.on("motion-detected", (data) => {
      console.log(data);
      setData(data);
    });
    socket.on("message", (data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  const event = data;

  const boxTemp = event?.environmental_conditions?.box_temperature || 0;

  return (
    <>
      <Nav />
      {!event ? (
        <EmptyListHandler
          title="No Event Recorded Yet"
          subTitle="Data will be displayed here whenever a motion detection event occurs."
        />
      ) : (
        <Container py={8} maxW="container.lg">
          <Flex align="center" justify="space-between">
            <ExcelDownloader />
            <HStack fontSize="x-small">
              <Box
                borderRadius="100%"
                p={1}
                bg={isSocketConnected ? "green.200" : "red.200"}
              />
              <Text
                color={isSocketConnected ? "green.500" : "red.500"}
                fontWeight="bold"
              >
                {isSocketConnected ? "Online" : "Offline"}
              </Text>
            </HStack>
          </Flex>
          <SimpleGrid columns={{ md: 2 }} spacing={4} alignItems="flex-start">
            <AccordionCard
              label={
                <VStack w="100%" p={4} spacing={0} alignItems="flex-start">
                  <Heading size="md">Nest Motion Detection</Heading>
                  <Text fontSize="sm">
                    Motion Detected: {JSON.stringify(event?.motion_detected)}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Updated {moment(event?.timestamp).fromNow()}
                  </Text>
                </VStack>
              }
            >
              <ListPair
                value={event?.event_type?.toLocaleUpperCase()}
                label="Event Type"
              />
              <ListPair value={event?.device_id} label="Device Id" />
              <ListPair value={event?.location} label="Location" />

              <ListPair
                value={event?.video_duration || "N/A"}
                label="Video Duration"
              />
              <ListPair value={event?.video_url || "N/A"} label="Video Url" />
              <ListPair value={event?.nest_status} label="Nest Status" />
              <ListPair value={event?.chick_count} label="Chick Count" />
              <ListPair
                value={moment(event?.timestamp).format("DD MMM YYYY mm:ss")}
                label="Time"
              />
              <ListPair value={event?.media_type} label="Media Type" />
              <Flex fontSize="sm" my={6} justify="space-between">
                <Text>Link to Image</Text>
                <Button
                  size="xs"
                  leftIcon={<FaImage />}
                  onClick={() => window.open(event?.media_url, "_blank")}
                >
                  Open Image
                </Button>
              </Flex>
              <Image
                src={event?.media_url}
                mt={10}
                rounded="md"
                objectFit="contain"
              />
            </AccordionCard>
            <VStack>
              <VStack
                w="100%"
                p={6}
                alignItems="flex-start"
                border="1px solid "
                borderColor="gray.100"
                spacing={1}
              >
                <Heading size="md">Power Status</Heading>

                <ListPair
                  value={event?.power_status?.power_source}
                  label="Power Source"
                />
                <Flex w="100%" fontSize="sm" justify="space-between">
                  <Text>Battery Level</Text>
                  <HStack>
                    <Text fontWeight="bold">
                      {event?.power_status?.battery_level}%
                    </Text>
                    <Box
                      position="relative"
                      fontSize="xs"
                      h={3}
                      w={16}
                      bg="gray.100"
                      _after={{
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bg:
                          (event?.power_status?.battery_level || 0) > 20
                            ? "green.300"
                            : "red.300",
                        h: "100%",
                        w: `${event?.power_status?.battery_level}%`,
                      }}
                    />
                  </HStack>
                </Flex>
              </VStack>

              <VStack
                w="100%"
                p={6}
                alignItems="flex-start"
                border="1px solid "
                borderColor="gray.100"
                spacing={1}
              >
                <Heading size="md">Environmental Conditions</Heading>
                <ListPair
                  value={`${event?.environmental_conditions?.temperature} C`}
                  label="Temperature"
                />
                <ListPair
                  value={`${event?.environmental_conditions?.humidity} %`}
                  label="Humidity"
                />
                <Flex w="100%" fontSize="sm" justify="space-between">
                  <Text>Box Temperature</Text>
                  <HStack
                    fontWeight="bold"
                    color={boxTemp >= 35 ? "red.500" : "green.500"}
                  >
                    {boxTemp >= 35 && <FaExclamationTriangle />}
                    <Text>{`${boxTemp} C`}</Text>
                  </HStack>
                </Flex>
              </VStack>
            </VStack>
          </SimpleGrid>
        </Container>
      )}
    </>
  );
};

export default Home;
