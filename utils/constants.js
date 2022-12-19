// var URLst = "http://165.22.190.111:3000/";
import * as XLSX from "xlsx";

const URLst = "https://api.seleda.hahu.one/";

export default URLst;

export const primary_color = "#1A4B30";

export const handle401 = () => {
  localStorage.clear();
};

export const exportToExcel = (dataArray, name) => {
  const worksheet = XLSX.utils.json_to_sheet(dataArray);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${name}.xlsx`);
};
