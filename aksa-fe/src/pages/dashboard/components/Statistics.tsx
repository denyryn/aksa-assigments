import StatCard from "../../../components/StatCard";
import DivisionIcon from "@/assets/svgs/division.svg";
import EmployeeIcon from "@/assets/svgs/employee.svg";
import { useEmployee } from "../../../contexts/EmployeeContext";
import { useDivision } from "../../../contexts/DivisionContext";

export default function Statistics() {
  const { totalDivisions } = useDivision();
  const { totalEmployees } = useEmployee();

  return (
    <>
      <StatCard
        label="Total Divisions"
        value={totalDivisions.toString()}
        color="#3640FF"
        icon={
          <img
            className="size-16 invert dark:invert-0"
            src={DivisionIcon}
            alt="Division"
          />
        }
      />
      <StatCard
        label="Total Employees"
        value={totalEmployees.toString()}
        color="#FFBF2A"
        icon={
          <img
            className="size-16 invert dark:invert-0"
            src={EmployeeIcon}
            alt="Employee"
          />
        }
      />
    </>
  );
}
