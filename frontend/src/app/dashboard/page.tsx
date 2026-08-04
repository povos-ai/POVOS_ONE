"use client";

import { useState } from "react";

import Avatar from "@/components/ui/Avatar";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/Dropdown";
import Tabs from "@/components/ui/Tabs";
import Button from "@/components/ui/Button";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SearchBar from "@/components/dashboard/SearchBar";
import OpportunityTable from "@/components/dashboard/OpportunityTable";
import StatsCard from "@/components/dashboard/StatsCard";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-8">

      <DashboardHeader />

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">

        <Button onClick={() => setOpen(true)}>
          Open Modal
        </Button>

        <Button variant="secondary">
          Secondary
        </Button>

        <Button variant="outline">
          Outline
        </Button>

        <Button variant="danger">
          Delete
        </Button>

      </div>

      <SearchBar />

      {/* Tabs */}
      <Tabs
        items={[
          {
            label: "All",
            value: "all",
          },
          {
            label: "Schemes",
            value: "schemes",
          },
          {
            label: "Jobs",
            value: "jobs",
          },
          {
            label: "Startups",
            value: "startups",
          },
        ]}
      />

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Live Opportunities"
          value="12,846"
          subtitle="Across India"
        />

        <StatsCard
          title="Government Schemes"
          value="284"
          subtitle="Currently Active"
        />

        <StatsCard
          title="AI Matches"
          value="1,289"
          subtitle="useralized Recommendations"
        />

        <StatsCard
          title="Applications"
          value="487"
          subtitle="Submitted"
        />

      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">

        <Avatar name="Kishore Kunal" size="sm" />
        <Avatar name="Kishore Kunal" size="md" />
        <Avatar name="Kishore Kunal" size="lg" />
        <Avatar name="Kishore Kunal" size="xl" />

      </div>

      {/* Dropdown */}
      <Dropdown
        label="Select Category"
        placeholder="Choose Opportunity"
        items={[
          {
            label: "Government Scheme",
            value: "scheme",
          },
          {
            label: "Startup",
            value: "startup",
          },
          {
            label: "Job",
            value: "job",
          },
          {
            label: "Scholarship",
            value: "scholarship",
          },
        ]}
      />

      <OpportunityTable />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="POVOS ONE"
      >
        <p className="text-slate-600">
          Welcome to the POVOS ONE Enterprise Platform.
        </p>

        <div className="mt-6 flex justify-end">
          <Button onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>

      </Modal>

    </div>
  );
}