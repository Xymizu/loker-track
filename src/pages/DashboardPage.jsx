import PromoBanner from '../components/PromoBanner'
import StatsRow from '../components/StatsRow'
import OverviewCharts from '../components/OverviewCharts'
import RecentActivity from '../components/RecentActivity'

export default function DashboardPage({ jobs, onOpen, onGoToActive, onGoToInterviews }) {
  return (
    <>
      <PromoBanner jobs={jobs} onViewStatus={(status) => onGoToInterviews(status)} />
      <StatsRow jobs={jobs} />
      <OverviewCharts jobs={jobs} />
      <RecentActivity jobs={jobs} onOpen={onOpen} onSeeAll={onGoToActive} />
    </>
  )
}
