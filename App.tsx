import React, { useState, useCallback } from 'react';
import { Page, CurrentPage } from './types';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import CreateTeamWizard from './pages/CreateTeamWizard';
import TeamDetailPage from './pages/TeamDetailPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>({ page: Page.Main });

  const navigate = useCallback((page: CurrentPage) => {
    setCurrentPage(page);
  }, []);

  const renderPage = () => {
    switch (currentPage.page) {
      case Page.Main:
        return <MainPage navigate={navigate} />;
      case Page.About:
        return <AboutPage />;
      case Page.CreateTeam:
        return <CreateTeamWizard navigate={navigate} startFromStep1={currentPage.startFromStep1} />;
      case Page.TeamDetail:
        return <TeamDetailPage navigate={navigate} teamId={currentPage.teamId} />;
      default:
        return <MainPage navigate={navigate} />;
    }
  };

  return (
    <div className="bg-background min-h-screen font-sans text-near-black">
      <Header navigate={navigate} currentPage={currentPage.page} />
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;