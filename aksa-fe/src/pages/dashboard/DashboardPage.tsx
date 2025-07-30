import Nav from "../../components/Nav";
import Statistics from "./components/Statistics";
import EmployeeTable from "./components/employee/EmployeeTable";
import DivisionTable from "./components/division/DivisionTable";

export default function DashboardPage() {
  return (
    <div className="bg-background">
      {/* Nav */}
      <Nav />

      {/* Content */}
      <div className="bg-background max-w-7xl columns-1 items-center mx-2 lg:mx-auto space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-4 ">
          <Statistics />
        </div>

        {/* Tables */}
        <DivisionTable />
        <EmployeeTable />
      </div>
    </div>
  );
}
