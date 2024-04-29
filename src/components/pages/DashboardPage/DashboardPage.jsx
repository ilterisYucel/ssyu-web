import React, { useContext } from "react";
import { SimpleGrid, Box, Center, VStack, Icon, Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Pie, Line, Radar, Bar } from "react-chartjs-2";
import { GrInbox } from "react-icons/gr";

import { AuthLayout } from "../../layouts/index.js";
import { CustomerContext, MembershipContext } from "../../../context/index.js";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);
const ChartGrid = ({ chart1, chart2, chart3, chart4, chart5, chart6 }) => {
  const { innerWidth: width, innerHeight: height } = window;
  const chartHeight = height / 2 - 40;
  return (
    <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4} padding={8}>
      <Center h={chartHeight}>{chart1}</Center>
      <Center h={chartHeight}>{chart2}</Center>
      <Center h={chartHeight}>{chart3}</Center>
      <Center h={chartHeight}>{chart4}</Center>
      <Center h={chartHeight}>{chart5}</Center>
      <Center h={chartHeight}>{chart6}</Center>
    </SimpleGrid>
  );
};

const NoData = () => {
  return (
    <Box>
      <VStack alignItems="center">
        <Icon boxSize={8} as={GrInbox} />
        <Text>Veri Bulanamadı!</Text>
      </VStack>
    </Box>
  );
};
const GenderDistribution = () => {
  const { customers } = useContext(CustomerContext);
  const manCount = customers.filter(
    (customer) => customer.gender.toLowerCase() === "e"
  ).length;
  const womanCount = customers.filter(
    (customer) => customer.gender.toLowerCase() === "k"
  ).length;

  const chart1Data = {
    labels: ["Kadın", "Erkek"],
    datasets: [
      {
        label: "Müşterilerin Cinsiyet Dağılımı",
        data: [womanCount, manCount],
        backgroundColor: ["red", "blue"],
        borderWidth: 1,
      },
    ],
  };

  const component =
    manCount + womanCount ? <Pie data={chart1Data} /> : <NoData />;
  return component;
};

const CustomerMembershipsStatus = () => {
  const { customers } = useContext(CustomerContext);
  const { memberships } = useContext(MembershipContext);

  const passiveCount = customers.filter((customer) => {
    const customerMemberships = memberships.filter(
      (membership) => memberships.customerId === customer.id
    );
    const now = new Date();
    return customerMemberships.some(
      (membership) =>
        new Date(membership.beginDate) > now || membership.endDate < now
    );
  }).length;
  const activeCount = customers.filter((customer) => {
    const customerMemberships = memberships.filter(
      (membership) => memberships.customerId === customer.id
    );
    const now = new Date();
    return customerMemberships.some(
      (membership) =>
        new Date(membership.beginDate) < now && membership.endDate >= now
    );
  }).length;

  const chart2Data = {
    labels: ["Pasif", "Aktif"],
    datasets: [
      {
        label: "Aktif Pasif Üyeler",
        data: [passiveCount, activeCount],
        backgroundColor: ["green", "red"],
        borderWidth: 1,
      },
    ],
  };
  const component =
    passiveCount + activeCount ? <Pie data={chart2Data} /> : <NoData />;
  return component;
};

const MounthBasedMemhership = () => {
  const { customers } = useContext(CustomerContext);
  const { memberships } = useContext(MembershipContext);

  const chart3Data = {
    labels: ["03/2024", "04/2024", "05/2024", "06/2024", "06/2024"],
    datasets: [
      {
        label: "Aylara göre Kadın Üyelikleri",
        backgroundColor: "rgba(255, 0, 0 ,0.4)",
        data: [1, 0, 3, 5, 10],
      },
      {
        label: "Aylara göre Erkek Üyelikleri",
        backgroundColor: "rgba(0, 0, 255 ,0.4)",
        data: [6, 3, 2, 2, 1],
      },
    ],
  };
  return <NoData />;
};

const CustomerLoyality = () => {
  const { customers } = useContext(CustomerContext);
  const { memberships } = useContext(MembershipContext);

  const chart4Data = {
    labels: ["İlteris", "Yağmur", "Kaju"],
    datasets: [
      {
        label: "Müşteri Sadakati",
        data: [8, 16, 18],
        backgroundColor: [
          "rgba(0, 255, 0 ,0.4)",
          "rgba(255, 0, 0 ,0.4)",
          "rgba(0, 0, 255 ,0.4)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <NoData />;
};
const DashboardPage = () => {
  const content = (
    <ChartGrid
      chart1={<GenderDistribution />}
      chart2={<CustomerMembershipsStatus />}
      chart3={<MounthBasedMemhership />}
      chart4={<CustomerLoyality />}
      chart5={<MounthBasedMemhership />}
      chart6={<CustomerLoyality />}
    />
  );

  return <AuthLayout children={content}></AuthLayout>;
};

export default DashboardPage;
