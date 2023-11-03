"use client";

import { useTreeData } from "react-stately";
import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import {
  Button,
  ButtonGroup,
  Divider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "hours",
    label: "HOURS",
  },
  {
    key: "role",
    label: "ROLE"
  }
];

const rows = [
  {
    key: "1",
    name: "Big Sean",
    hours: 7.5,
    role: 'bar'
  },
  {
    key: "2",
    name: "Big Pissa",
    hours: 5,
    role: 'door'
  },
  {
    key: "3",
    name: "Dat bitch Jill",
    hours: 4,
    role: 'bar'
  },
];



export default function CalculatorPage() {
  const [totalTips, setTotalTips] = useState<string>("");
  useEffect(() => {
    console.log(totalTips);
  }, [totalTips]);
  
  // for <Tabs> functionality
  const [selectedTab, setSelectedTab] = useState<string>("tips");
  
  const [newName, setNewName] = useState<string>("");
  const [newHours, setNewHours] = useState<string>('');
  const [newIsBar, setNewIsBar] = useState<string>('false');
  
  const handleNewWorker = (newName: string, newHours: string, newIsBar: string) => {
    const name = newName
    const hours = parseInt(newHours)
    const isBar = Boolean(newIsBar)
    
    rows.push({ key: (rows.length + 1).toString(), name: name, hours: hours, role: isBar ? 'bar' : 'door' })
    console.log(rows)
    // setting the values to empty re-renders the page, updating the view of the Table in the process
    setNewName('')
    setNewHours('')
    setNewIsBar('')
  }

  return (
    <div>
      <Tabs
        aria-label="Options"
        color={"secondary"}
        variant={"underlined"}
        selectedKey={selectedTab}
        disabledKeys={totalTips ? [] : ["workers", "result"]}
        // onClick={(e) => e.preventDefault()}
      >
        <Tab key="tips" title="1. Tips">
          <h1 className={title()}>What&apos;s the total tip amount?</h1>
          <Spacer y={10} />
          <Input
            className="w-40 mx-auto"
            type={"numeric"}
            placeholder={"0"}
            size="lg"
            value={totalTips}
            onInput={(e) => setTotalTips(e.currentTarget.value)}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            autoFocus
          />
          <Spacer y={10} />
          <Button
            size="lg"
            color={"secondary"}
            variant={"shadow"}
            isDisabled={!totalTips}
            onClick={() => setSelectedTab("workers")}
          >
            Next
          </Button>
        </Tab>
        <Tab key="workers" title="2. Workers">
          <div className="grid grid-cols-4">
            <Input
              className="cols-3"
              isRequired
              label="Name"
              value={newName}
              placeholder="Enter a name"
              onChange={(e) => setNewName(e.currentTarget.value)}
            />
            <Input
              isRequired
              label="Hours"
              type="tel"
              inputMode="decimal"
              value={newHours}
              placeholder="0"
              onChange={(e) => setNewHours(e.currentTarget.value)}
            />
            <Switch className="flex flex-row-reverse gap-1" value={newIsBar}>
              <div className="flex flex-col">
                <p>Bar</p>
                <p>Door</p>
              </div>
            </Switch>
            <Button size='sm' onClick={() => handleNewWorker(newName, newHours, newIsBar)}>Add</Button>
          </div>
          <Table isStriped>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell className="text-left">
                      {getKeyValue(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Spacer y={5} />
          <ButtonGroup>
            <Button
              size="lg"
              color={"secondary"}
              variant={"flat"}
              onClick={() => setSelectedTab("tips")}
            >
              Back
            </Button>
            <Button
              size="lg"
              color={"secondary"}
              variant={"shadow"}
              onClick={() => setSelectedTab("result")}
            >
              Next
            </Button>
          </ButtonGroup>
        </Tab>
        <Tab key="result" title="3. Result">
          <h1 className={title({ color: "foreground" })}>Results</h1>
          <Spacer y={5} />
          <Button
            size="lg"
            color={"secondary"}
            variant={"flat"}
            onClick={() => setSelectedTab("workers")}
          >
            Back
          </Button>
        </Tab>
      </Tabs>
    </div>
  );
}
