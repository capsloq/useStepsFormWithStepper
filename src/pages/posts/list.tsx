import React from "react";
import { useOne } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  EditButton
} from "@pankod/refine-mui";

import { ICategory, IPost } from "interfaces";
import { useModalForm } from "@pankod/refine-react-hook-form";
import { EditPostModalAndStepper } from "./editWithModalAndStepper";


export const PostsList: React.FC = () => {
  const editModalFormProps = useModalForm<IPost>({
    refineCoreProps: { action: "edit" }
  });
  const {
    modal: { show: showEditModal }
  } = editModalFormProps;

  const columns = React.useMemo<GridColumns<IPost>>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50
      },
      { field: "title", headerName: "Title", minWidth: 100, flex: 1 },

      { field: "status", headerName: "Status", minWidth: 120, flex: 0.3 },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        renderCell: function render({ row }) {
          return (
            <EditButton onClick={() => showEditModal(row.id)}>
              Edit in Modal with Stepper
            </EditButton>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80
      }
    ],
    []
  );

  const { dataGridProps } = useDataGrid<IPost>({
    columns
  });

  return (
    <>
      <List>
        <DataGrid {...dataGridProps} autoHeight />
      </List>
      <EditPostModalAndStepper {...editModalFormProps} />
    </>
  );
};
