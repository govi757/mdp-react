import React from 'react';
import {
  Button,
  Checkbox,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { selectValue } from "../dataSelector";
import { ActionType, FTableActionField } from "./FDataTableMDP";

import { useState } from "react";
import { generateElementFromMetaData } from "../mdpHook";
import GMenu from "../general/GMenu";

const FDataTable = ({
  columnList,
  data = [],
  actionList = [],
  itemKey,
  title,
  onActionClick,
}: {
  columnList: any[];
  data: any[];
  actionList: FTableActionField[];
  itemKey?: string;
  title?: string;
  onActionClick?: (itemKey: string,dataList?: any) => void;
}) => {
  const [selectedRowList, setSelectedRowList] = useState<any[]>([]);

  const otherActionList = () => {
    return actionList.filter((item) => item.type === ActionType.OTHERS);
  };

  const handleOtherMenuClick = (item: FTableActionField) => {
    if (item.noSelect) {
      item.onClick();
      onActionClick && onActionClick(item.key);
    } else if (itemKey) {
      const rowDataList = data.filter((dataItem) => {
        console.log(dataItem, "Data item");
        return selectedRowList.includes(dataItem[itemKey]);
      });
      item.onClick(rowDataList);
      onActionClick && onActionClick(item.key,rowDataList);
    }
  };

  const handleSelectRow = (row: any, val: any) => {
    const newSelectedRowList = selectedRowList;
    if (itemKey) {
      const selectedRowIndex = newSelectedRowList.indexOf(row[itemKey]);
      if (selectedRowIndex === -1) {
        newSelectedRowList.push(row[itemKey]);
      } else {
        newSelectedRowList.splice(selectedRowIndex, 1);
      }
    }

    setSelectedRowList([...newSelectedRowList]);
  };

  return (
    <div>
      <div className="px-2 d-flex align-items-center">
        <div className="flex-fill">
          <h4>{title}</h4>
        </div>
        {otherActionList().length > 0 && (
          <div className="mx-2">
            <GMenu label="Actions">
              {otherActionList().map((item, index) => {
                return (
                  <MenuItem
                    disabled={!item.noSelect && selectedRowList.length == 0}
                    key={item.label + index}
                    onClick={() => handleOtherMenuClick(item)}
                  >
                    {item.label}
                  </MenuItem>
                );
              })}
            </GMenu>
          </div>
        )}
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            {otherActionList().length > 0 && <TableCell width={15}></TableCell>}
            {columnList.map((item) => {
              return <TableCell key={item.label}>{item.label}</TableCell>;
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={"row" + index}>
                {otherActionList().length > 0 && (
                  <TableCell width={15}>
                    {itemKey && (
                      <Checkbox
                        size="small"
                        checked={selectedRowList.includes(item[itemKey])}
                        onChange={(val) => {
                          handleSelectRow(item, val);
                        }}
                        sx={{ padding: 0 }}
                      />
                    )}
                  </TableCell>
                )}
                {columnList.map((column) => {
                  return (
                    <TableCell key={column.dataSelectorKey + index}>
                      {generateElementFromMetaData({
                        componentClassMetaData: column.columnCellMetaData,
                        value:item,
                      })}
                      {/* {selectValue(item, column.dataSelectorKey)} */}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default FDataTable;
