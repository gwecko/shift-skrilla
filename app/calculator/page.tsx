"use client";

import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "hours",
    label: "HOURS",
  },
];

export default function CalculatorPage() {
  const [totalTips, setTotalTips] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("tips");
  useEffect(() => {
    console.log(totalTips);
  }, [totalTips]);

  const dynamicRows: [{ name: string; hours: number }] = [];

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
            variant={"flat"}
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
          <Table>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
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
          <h1 className={title({ color: 'foreground' })}>Results</h1>
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
