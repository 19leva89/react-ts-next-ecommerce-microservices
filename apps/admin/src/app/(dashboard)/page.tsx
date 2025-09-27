import AppAreaChart from "@/components/app-area-chart";
import AppBarChart from "@/components/app-bar-chart";
import AppPieChart from "@/components/app-pie-chart";
import CardList from "@/components/card-list";
import TodoList from "@/components/todo-list";
import { auth } from "@clerk/nextjs/server";

const Homepage = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  const orderChartData = fetch(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/order-chart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart dataPromise={orderChartData} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Latest Transactions" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <TodoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Popular Products" />
      </div>
    </div>
  );
};

export default Homepage;
