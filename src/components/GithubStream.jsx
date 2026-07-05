import React, { useState, useEffect } from 'react';
import { playHover, playClick } from '../utils/sfx';

export default function GithubStream() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 60) return `${Math.max(1, diffMins)}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${diffDays}d ago`;
    } catch (e) {
      return 'just now';
    }
  };

  const getMockEvents = () => [
    {
      id: 'mock-1',
      desc: 'Pushed 1 commit to Portfolio_abhilash ("Add dynamic themes & timeline path")',
      icon: 'fas fa-code-branch',
      color: 'text-green-400',
      time: '12m ago',
      url: 'https://github.com/Abhilash-KK/Portfolio_abhilash'
    },
    {
      id: 'mock-2',
      desc: 'Created repository Portfolio_abhilash',
      icon: 'fas fa-plus-circle',
      color: 'text-cyan-400',
      time: '3h ago',
      url: 'https://github.com/Abhilash-KK/Portfolio_abhilash'
    },
    {
      id: 'mock-3',
      desc: 'Pushed 2 commits to tsrd ("Optimize YOLOv8 image processing")',
      icon: 'fas fa-code-branch',
      color: 'text-green-400',
      time: '1d ago',
      url: 'https://github.com/Abhilash-KK/Portfolio_abhilash'
    },
    {
      id: 'mock-4',
      desc: 'Created branch main in student-leave-hub',
      icon: 'fas fa-code-branch',
      color: 'text-cyan-400',
      time: '2d ago',
      url: 'https://github.com/Abhilash-KK/Portfolio_abhilash'
    }
  ];

  useEffect(() => {
    const fetchGithubEvents = async () => {
      try {
        const res = await fetch('https://api.github.com/users/Abhilash-KK/events');
        if (!res.ok) throw new Error('API limit reached or user not found');
        const data = await res.json();
        
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No events found');
        }

        const parsed = data.slice(0, 5).map((event) => {
          let desc = '';
          let icon = 'fas fa-code';
          let color = 'text-primary';
          
          const repoName = event.repo.name.replace('Abhilash-KK/', '');

          if (event.type === 'PushEvent') {
            const commitCount = event.payload.commits ? event.payload.commits.length : 1;
            const message = event.payload.commits?.[0]?.message || 'Update code';
            desc = `Pushed ${commitCount} commit(s) to ${repoName} ("${message}")`;
            icon = 'fas fa-code-branch';
            color = 'text-green-400';
          } else if (event.type === 'CreateEvent') {
            desc = `Created ${event.payload.ref_type} ${event.payload.ref || ''} in ${repoName}`;
            icon = 'fas fa-plus-circle';
            color = 'text-cyan-400';
          } else if (event.type === 'WatchEvent') {
            desc = `Starred repository ${repoName}`;
            icon = 'fas fa-star';
            color = 'text-yellow-400';
          } else {
            desc = `Activity in ${repoName} (${event.type})`;
            icon = 'fas fa-code';
            color = 'text-slate-400';
          }

          return {
            id: event.id,
            desc,
            icon,
            color,
            time: formatTime(event.created_at),
            url: `https://github.com/${event.repo.name}`
          };
        });
        
        setEvents(parsed);
      } catch (err) {
        setEvents(getMockEvents());
      } finally {
        setLoading(false);
      }
    };

    fetchGithubEvents();
  }, []);

  return (
    <div className="w-full lg:w-[350px] bg-[#07070a] border border-border-dark rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] text-left font-mono text-xs h-[320px] flex flex-col">
      {/* Header */}
      <div className="bg-[#101017] px-4 py-3 border-b border-border-dark/60 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 block animate-pulse"></span>
          <span className="text-[0.65rem] font-bold text-slate-400 tracking-widest uppercase font-display">
            DEVLOG: GITHUB ACTIVITY
          </span>
        </div>
        <span className="text-slate-600 text-[0.6rem] font-bold">API v3</span>
      </div>

      {/* Body Logs */}
      <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3.5 scrollbar-thin">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2.5 text-slate-500">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span>FETCHING RECENT EVENTS...</span>
          </div>
        ) : (
          events.map((event) => (
            <a
              key={event.id}
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="flex gap-3 hover:bg-white/[0.02] p-2 -m-2 rounded-lg transition-all duration-200 border border-transparent hover:border-border-dark"
            >
              <div className={`w-7 h-7 rounded-md bg-card-dark border border-border-dark flex items-center justify-center shrink-0 ${event.color}`}>
                <i className={`${event.icon} text-[0.8rem]`}></i>
              </div>
              <div className="flex flex-col justify-center min-w-0 flex-1">
                <p className="text-slate-300 leading-normal truncate-two-lines text-[0.7rem]">
                  {event.desc}
                </p>
                <span className="text-[0.6rem] text-slate-500 font-bold mt-1">
                  {event.time}
                </span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
