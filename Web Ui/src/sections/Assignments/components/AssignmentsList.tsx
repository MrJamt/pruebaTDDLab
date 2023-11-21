import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentsRepository from "../../../modules/Assignments/repository/AssignmentsRepository";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { AssignmentDataObject } from "../../../modules/Assignments/domain/assignmentInterfaces"; // Import your assignment model

import { GetAssignments } from "../../../modules/Assignments/application/GetAssignments"; // Import your fetchAssignments function\
import { DeleteAssignment } from "../../../modules/Assignments/application/DeleteAssignment";
import { SubmitAssignment } from "../../../modules/Assignments/application/SubmitAssignment";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { GitLinkDialog } from "./GitHubLinkDialog";
import { ValidationDialog } from "./ValidationDialog";
import Assignment from "./Assignment";
import { MenuItem, Select } from "@mui/material";

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
});

const CustomTableCell1 = styled(TableCell)({
  width: "80%",
});

const CustomTableCell2 = styled(TableCell)({
  width: "10%",
});

const CustomTableCell3 = styled(TableCell)({
  width: "10%",
});

interface AssignmentsProps {
  ShowForm: () => void;
}

function Assignments({ ShowForm: showForm }: Readonly<AssignmentsProps>) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [githubLinkDialogOpen, setGithubLinkDialogOpen] = useState(false);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState<string>("sortByDate");
  const [selectedAssignmentIndex, setSelectedAssignmentIndex] = useState<
    number | null
  >(null);
  const navigate = useNavigate();

  const [, setSelectedRow] = useState<number | null>(null);
  const [, setHoveredRow] = useState<number | null>(null);
  const [assignments, setAssignments] = useState<AssignmentDataObject[]>([]);
  const assignmentsRepository = new AssignmentsRepository();
  const getAssignments = new GetAssignments(assignmentsRepository);
  const deleteAssignment = new DeleteAssignment(assignmentsRepository);
  const submitAssignment = new SubmitAssignment(assignmentsRepository);

  useEffect(() => {
    // Use the fetchAssignments function to fetch assignments
    getAssignments
      .obtainAllAssignments()
      .then((data) => {
        setAssignments(data);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  });

  const handleClickDetail = (index: number) => {
    setSelectedRow(index);
    navigate(`/assignment/${assignments[index].id}`);
  };

  const handleClickDelete = (index: number) => {
    setSelectedAssignmentIndex(index);
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (
        selectedAssignmentIndex !== null &&
        assignments[selectedAssignmentIndex]
      ) {
        console.log(
          "ID de la tarea a eliminar:",
          assignments[selectedAssignmentIndex].id
        );
        await deleteAssignment.deleteAssignment(
          assignments[selectedAssignmentIndex].id
        );
      }
      setConfirmationOpen(false);
    } catch (error) {
      console.error(error);
    }
    setValidationDialogOpen(true);
    setConfirmationOpen(false);
  };

  const handleSendGithubLink = (link: string) => {
    if (selectedAssignmentIndex !== null) {
      submitAssignment.submitAssignment(
        assignments[selectedAssignmentIndex].id,
        link
      );
    }
  };

  const handleRowHover = (index: number | null) => {
    setHoveredRow(index);
  };

  const handleOrdenarChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedSorting(event.target.value as string);
    // Handle sorting logic based on the selected value
    // You can add logic here to sort the assignments accordingly
  };
  return (
    <Container>
      <section className="Tareas">
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell1>Tareas</CustomTableCell1>
              <CustomTableCell3>
                <ButtonContainer>
                  {/* Use Select component for the Ordenar button */}
                  <Select
                    value={selectedSorting}
                    onChange={handleOrdenarChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Ordenar" }}
                  >
                    <MenuItem value="" disabled>
                      Ordenar
                    </MenuItem>
                    <MenuItem value="sortByDate">Orden alfabetico</MenuItem>
                    {/* Add more sorting options as needed */}
                  </Select>
                </ButtonContainer>
              </CustomTableCell3>
              <CustomTableCell2>
                <ButtonContainer>
                  <Button variant="outlined" onClick={showForm}>
                    Crear
                  </Button>
                </ButtonContainer>
              </CustomTableCell2>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment, index) => (
              <Assignment
                key={assignment.id}
                assignment={assignment}
                index={index}
                handleClickDetail={handleClickDetail}
                handleClickDelete={handleClickDelete}
                handleRowHover={handleRowHover}
              />
            ))}
          </TableBody>
        </Table>
        {githubLinkDialogOpen && (
          <GitLinkDialog
            open={githubLinkDialogOpen}
            onClose={() => setGithubLinkDialogOpen(false)}
            onSend={handleSendGithubLink}
          />
        )}
        {confirmationOpen && (
          <ConfirmationDialog
            open={confirmationOpen}
            title="Eliminar tarea"
            content="¿Estás seguro de que deseas eliminar esta tarea?"
            cancelText="Cancelar"
            deleteText="Eliminar"
            onCancel={() => setConfirmationOpen(false)}
            onDelete={handleConfirmDelete}
          />
        )}
        {validationDialogOpen && (
          <ValidationDialog
            open={validationDialogOpen}
            title="Tarea Eliminada exitosamente"
            closeText="Cerrar"
            onClose={() => setValidationDialogOpen(false)}
          />
        )}
      </section>
    </Container>
  );
}

export default Assignments;
