import type { Loan } from "@/shared/models/loan";
import { isCurrentMonthYear } from "./is-current-month-year";

export function filterAndSortLoan(loans: Loan[]): Loan[] | null {
  if (loans) {
    const currentMonthYearEquipments = loans.filter((loan) =>
      isCurrentMonthYear(loan.date)
    );

    return currentMonthYearEquipments.sort((a, b) => {
      const dateA = new Date(a.date.split("-").reverse().join("-"));
      const dateB = new Date(b.date.split("-").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    });
  }

  return null;
}
