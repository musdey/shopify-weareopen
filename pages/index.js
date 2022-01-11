import {
  Heading,
  Page,
  Card,
  SettingToggle,
  TextStyle,
  TextField,
  FormLayout,
  Button,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import React, { useEffect, useState } from "react";
import { useApolloClient } from "react-apollo";
import { gql } from "apollo-boost";

const Index = () => {
  const apolloClient = useApolloClient();
  const [dataChanged, setDataChanged] = useState(false);
  const [metafieldId, setMetafieldId] = useState("");
  const [monday, setMonday] = useState(true); //open from to
  const [tuesday, setTuesday] = useState(true);
  const [wednesday, setWednesday] = useState(true);
  const [thursday, setThursday] = useState(true);
  const [friday, setFriday] = useState(true);
  const [saturday, setSaturday] = useState(true);
  const [sunday, setSunday] = useState(true);
  const [monHours, setmonHours] = useState("00:00-23:59"); //open from to
  const [tuesHours, settuesHours] = useState("00:00-23:59");
  const [wedHours, setwedHours] = useState("00:00-23:59");
  const [thurHours, setthurHours] = useState("00:00-23:59");
  const [friHours, setfriHours] = useState("00:00-23:59");
  const [satHours, setsatHours] = useState("00:00-23:59");
  const [sunHours, setsunHours] = useState("00:00-23:59");

  const app = useAppBridge();

  const getShopMetafields = async () => {
    const response = await apolloClient.query({
      query: gql`
        {
          shop {
            metafields(first: 100) {
              edges {
                cursor
                node {
                  id
                  key
                  namespace
                  value
                }
              }
            }
          }
        }
      `,
    });
    if (!response.errors) {
      let result;
      response.data.shop.metafields.edges.forEach((edge) => {
        if (edge.node.namespace == "openinghours") {
          result = edge.node;
          setMetafieldId(result.id);
        }
      });
      const obj = JSON.parse(result.value);
      setMonday(obj.monday.split("-")[0] == "O" ? true : false);
      setTuesday(obj.tuesday.split("-")[0] == "O" ? true : false);
      setWednesday(obj.wednesday.split("-")[0] == "O" ? true : false);
      setThursday(obj.thursday.split("-")[0] == "O" ? true : false);
      setFriday(obj.friday.split("-")[0] == "O" ? true : false);
      setSaturday(obj.saturday.split("-")[0] == "O" ? true : false);
      setSunday(obj.sunday.split("-")[0] == "O" ? true : false);
      setmonHours(obj.monday.split(/-(.+)/)[1]);
      settuesHours(obj.tuesday.split(/-(.+)/)[1]);
      setwedHours(obj.wednesday.split(/-(.+)/)[1]);
      setthurHours(obj.thursday.split(/-(.+)/)[1]);
      setfriHours(obj.friday.split(/-(.+)/)[1]);
      setsatHours(obj.saturday.split(/-(.+)/)[1]);
      setsunHours(obj.sunday.split(/-(.+)/)[1]);
    }
  };

  useEffect(() => {
    getShopMetafields();
  }, []);

  useEffect(() => {
    setDataChanged(true);
  }, [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    monHours,
    tuesHours,
    wedHours,
    thurHours,
    friHours,
    satHours,
    sunHours,
  ]);

  const saveClicked = async () => {
    setDataChanged(false);
    //sendDAtaToBackend
    const authFetch = authenticatedFetch(app);
    const dataobject = {
      monday: `${monday ? "O" : "C"}-${monHours}`,
      tuesday: `${tuesday ? "O" : "C"}-${tuesHours}`,
      wednesday: `${wednesday ? "O" : "C"}-${wedHours}`,
      thursday: `${thursday ? "O" : "C"}-${thurHours}`,
      friday: `${friday ? "O" : "C"}-${friHours}`,
      saturday: `${saturday ? "O" : "C"}-${satHours}`,
      sunday: `${sunday ? "O" : "C"}-${sunHours}`,
    };

    const response = await authFetch(`/api/openinghours`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ metafieldId: metafieldId, dataobject }),
    });
    console.log(response.ok);
  };
  return (
    <Page>
      <Heading>Set the opening hours for your business</Heading>

      <Button
        disabled={!dataChanged}
        destructive={dataChanged}
        onClick={saveClicked}
      >
        Save changes
      </Button>
      <Card title="Monday" sectioned>
        <SettingToggle
          action={{
            content: monday ? "Close for day" : "Open for day",
            onAction: () => {
              setMonday(!monday);
            },
          }}
          enabled={monday}
        >
          Your shop is {monday ? "open" : "closed"} on
          <TextStyle variation="strong"> Monday</TextStyle>.
        </SettingToggle>
        <FormLayout>
          <FormLayout.Group>
            <TextField
              label="FROM"
              value={monHours.split("-")[0]}
              onChange={(data) => {
                const result = `${data}-${monHours.split("-")[1]}`;
                setmonHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
            <TextField
              label="TO"
              value={monHours.split("-")[1]}
              onChange={(data) => {
                const result = `${monHours.split("-")[0]}-${data}`;
                setmonHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
          </FormLayout.Group>
        </FormLayout>
      </Card>

      <Card title="Tuesday" sectioned>
        <SettingToggle
          action={{
            content: tuesday ? "Close for day" : "Open for day",
            onAction: () => {
              setTuesday(!tuesday);
            },
          }}
          enabled={tuesday}
        >
          Your shop is {tuesday ? "open" : "closed"} on
          <TextStyle variation="strong"> Tuesday</TextStyle>.
        </SettingToggle>
        <FormLayout>
          <FormLayout.Group>
            <TextField
              label="FROM"
              value={tuesHours.split("-")[0]}
              onChange={(data) => {
                const result = `${data}-${tuesHours.split("-")[1]}`;
                settuesHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
            <TextField
              label="TO"
              value={tuesHours.split("-")[1]}
              onChange={(data) => {
                const result = `${tuesHours.split("-")[0]}-${data}`;
                settuesHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
          </FormLayout.Group>
        </FormLayout>
      </Card>

      <Card title="Wednesday" sectioned>
        <SettingToggle
          action={{
            content: wednesday ? "Close for day" : "Open for day",
            onAction: () => {
              setWednesday(!wednesday);
            },
          }}
          enabled={wednesday}
        >
          Your shop is {wednesday ? "open" : "closed"} on
          <TextStyle variation="strong"> Wednesday</TextStyle>.
        </SettingToggle>
        <FormLayout>
          <FormLayout.Group>
            <TextField
              label="FROM"
              value={wedHours.split("-")[0]}
              onChange={(data) => {
                const result = `${data}-${wedHours.split("-")[1]}`;
                setwedHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
            <TextField
              label="TO"
              value={wedHours.split("-")[1]}
              onChange={(data) => {
                const result = `${wedHours.split("-")[0]}-${data}`;
                setwedHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
          </FormLayout.Group>
        </FormLayout>
      </Card>

      <Card title="Thursday" sectioned>
        <SettingToggle
          action={{
            content: thursday ? "Close for day" : "Open for day",
            onAction: () => {
              setThursday(!thursday);
            },
          }}
          enabled={thursday}
        >
          Your shop is {thursday ? "open" : "closed"} on
          <TextStyle variation="strong"> Thursday</TextStyle>.
        </SettingToggle>
        <FormLayout>
          <FormLayout.Group>
            <TextField
              label="FROM"
              value={thurHours.split("-")[0]}
              onChange={(data) => {
                const result = `${data}-${thurHours.split("-")[1]}`;
                setthurHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
            <TextField
              label="TO"
              value={thurHours.split("-")[1]}
              onChange={(data) => {
                const result = `${thurHours.split("-")[0]}-${data}`;
                setthurHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
          </FormLayout.Group>
        </FormLayout>
      </Card>

      <Card title="Friday" sectioned>
        <SettingToggle
          action={{
            content: friday ? "Close for day" : "Open for day",
            onAction: () => {
              setFriday(!friday);
            },
          }}
          enabled={friday}
        >
          Your shop is {friday ? "open" : "closed"} on
          <TextStyle variation="strong"> Friday</TextStyle>.
        </SettingToggle>
        <FormLayout>
          <FormLayout.Group>
            <TextField
              label="FROM"
              value={friHours.split("-")[0]}
              onChange={(data) => {
                const result = `${data}-${friHours.split("-")[1]}`;
                setfriHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
            <TextField
              label="TO"
              value={friHours.split("-")[1]}
              onChange={(data) => {
                const result = `${friHours.split("-")[0]}-${data}`;
                setfriHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
          </FormLayout.Group>
        </FormLayout>
      </Card>

      <Card title="Saturday" sectioned>
        <SettingToggle
          action={{
            content: saturday ? "Close for day" : "Open for day",
            onAction: () => {
              setSaturday(!saturday);
            },
          }}
          enabled={saturday}
        >
          Your shop is {saturday ? "open" : "closed"} on
          <TextStyle variation="strong"> Saturday</TextStyle>.
        </SettingToggle>
        <FormLayout>
          <FormLayout.Group>
            <TextField
              label="FROM"
              value={satHours.split("-")[0]}
              onChange={(data) => {
                const result = `${data}-${satHours.split("-")[1]}`;
                setsatHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
            <TextField
              label="TO"
              value={satHours.split("-")[1]}
              onChange={(data) => {
                const result = `${satHours.split("-")[0]}-${data}`;
                setsatHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
          </FormLayout.Group>
        </FormLayout>
      </Card>

      <Card title="Sunday" sectioned>
        <SettingToggle
          action={{
            content: sunday ? "Close for day" : "Open for day",
            onAction: () => {
              setSunday(!sunday);
            },
          }}
          enabled={sunday}
        >
          Your shop is {sunday ? "open" : "closed"} on
          <TextStyle variation="strong"> Sunday</TextStyle>.
        </SettingToggle>
        <FormLayout>
          <FormLayout.Group>
            <TextField
              label="FROM"
              value={sunHours.split("-")[0]}
              onChange={(data) => {
                const result = `${data}-${sunHours.split("-")[1]}`;
                setsunHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
            <TextField
              label="TO"
              value={sunHours.split("-")[1]}
              onChange={(data) => {
                const result = `${sunHours.split("-")[0]}-${data}`;
                setsunHours(result);
              }}
              inputMode="numeric"
              type="time"
            />
          </FormLayout.Group>
        </FormLayout>
      </Card>
    </Page>
  );
};

export default Index;
