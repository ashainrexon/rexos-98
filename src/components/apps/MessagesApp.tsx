// components/apps/MessagesApp.tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Sender = 'ashain' | 'rex';

type Reaction = { emoji: string; count: number; reacted: boolean };

type Message = {
  id: string;
  sender: Sender;
  text: string;
  time: string;
  reactions?: Reaction[];
};

type Profile = {
  name: string;
  tag: string;
  photo: string;
  color: string;
  banner: string;
  about: string;
  badges: string[];
  joined: string;
};

const profiles: Record<Sender, Profile> = {
  ashain: {
    name: 'Ashain',
    tag: '@ashain',
    photo: '/profiles/profile-1.jpeg',
    color: '#a97ee0',
    banner: 'linear-gradient(135deg, #2d1b4e, #7c3fd6)',
    about: 'Built this whole desktop from scratch. Probably still adding apps right now.',
    badges: ['🛠️ Site Creator', '☕ Runs on Coffee'],
    joined: 'Joined the server: always',
  },
  rex: {
    name: 'Rex',
    tag: '@rex-bot',
    photo: '/profiles/rex.jpg',
    color: '#57c98a',
    banner: 'linear-gradient(135deg, #0f3d2a, #2e8b57)',
    about: "RexOS 98's resident guide. I know where everything is hidden.",
    badges: ['🤖 Site Mascot', '📌 Verified Guide'],
    joined: 'Joined the server: since boot',
  },
};

// NOTE: to add more messages, just add another object to this array.
// - id must be unique (e.g. 'm11', 'm12'...)
// - sender must be exactly 'ashain' or 'rex'
// - reactions is optional — omit it entirely for a message with none
// - consecutive messages from the same sender automatically group under one header
const initialMessages: Message[] = [
  { id: 'm1', sender: 'ashain', text: 'ok be honest, is anyone actually going to find all these apps', time: 'Today at 9:14 PM' },
  { id: 'm2', sender: 'rex', text: "well if someone sees this, they are gonna know all the secrets", time: 'Today at 9:14 PM', reactions: [{ emoji: '😂', count: 2, reacted: false }] },
  { id: 'm3', sender: 'ashain', text: 'fair. lets start with the taskbar', time: 'Today at 9:15 PM' },
  { id: 'm4', sender: 'rex', text: 'Start Menu + Desktop icons both open real windows — About Me, Projects, Education, Work Experience, Contact, CV and more', time: 'Today at 9:15 PM' },
  { id: 'm5', sender: 'rex', text: 'Contact is secretly MS Paint. you can draw over the info. try the eraser too', time: 'Today at 9:16 PM', reactions: [{ emoji: '🎨', count: 5, reacted: false }, { emoji: '🔥', count: 2, reacted: false }] },
  { id: 'm6', sender: 'ashain', text: "don't forget the widgets — top left/right of the desktop, always on", time: 'Today at 9:17 PM' },
  { id: 'm7', sender: 'rex', text: 'World Clock shows the times of places the you have visited', time: 'Today at 9:17 PM' },
  { id: 'm8', sender: 'ashain', text: 'and Settings actually does stuff — real wallpaper swaps, shuffle mode, 12h/24h clock toggle and CRT effect', time: 'Today at 9:18 PM', reactions: [{ emoji: '👍', count: 1, reacted: false }] },
  { id: 'm9', sender: 'rex', text: "Music Widget holds music tracks that your friends love from shows and videogames so that they are part of this world you have created", time: 'Today at 9:19 PM' },
  { id: 'm10', sender: 'ashain', text: 'every aspect of this place is an intentional reference to something', time: 'Today at 9:19 PM', reactions: [{ emoji: '✅', count: 1, reacted: false }] },
  { id: 'm11', sender: 'rex', text: 'like how this app acts like a dev log of all the features?', time: 'Today at 9:20 PM' },
  { id: 'm12', sender: 'ashain', text: 'lets not give too much away', time: 'Today at 9:20 PM' },
];

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

// avatar that falls back to a colored initials circle if the real photo hasn't been added yet —
// stays circular either way, never shows a broken-image icon
function Avatar({ profile, size, onClick }: { profile: Profile; size: number; onClick: () => void }) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '9999px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: profile.color,
      }}
    >
      {!errored ? (
        <img
          src={profile.photo}
          alt={profile.name}
          onError={() => setErrored(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: size * 0.38,
          }}
        >
          {initials(profile.name)}
        </div>
      )}
    </div>
  );
}

// plain clickable text, guaranteed zero button chrome (no border/outline/box) since it's not a <button>
function ClickableName({ profile, onClick }: { profile: Profile; onClick: () => void }) {
  return (
    <span
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      style={{ color: profile.color, fontWeight: 700, cursor: 'pointer' }}
    >
      {profile.name}
    </span>
  );
}

export default function MessagesApp() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [profileOpen, setProfileOpen] = useState<Sender | null>(null);
  const [pickerFor, setPickerFor] = useState<string | null>(null);

  const quickEmojis = ['👍', '😂', '🔥', '❤️', '✅'];

  function toggleReaction(messageId: string, emoji: string) {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;

        const existing = msg.reactions?.find((r) => r.emoji === emoji);
        let reactions: Reaction[];

        if (existing) {
          reactions = msg.reactions!.map((r) =>
            r.emoji === emoji
              ? { ...r, count: r.reacted ? r.count - 1 : r.count + 1, reacted: !r.reacted }
              : r
          ).filter((r) => r.count > 0);
        } else {
          reactions = [...(msg.reactions ?? []), { emoji, count: 1, reacted: true }];
        }

        return { ...msg, reactions };
      })
    );
    setPickerFor(null);
  }

  return (
    <div className="w-full h-105 flex select-none text-xs relative overflow-hidden" style={{ background: '#313338', color: '#dcddde' }}>
      {/* server rail */}
      <div className="flex flex-col items-center gap-2 py-3 shrink-0" style={{ width: '52px', background: '#1e1f22' }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#2e8b57' }}>
          R98
        </div>
        <div className="w-8 h-px" style={{ background: '#3a3c41' }} />
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400" style={{ background: '#2b2d31' }}>
          +
        </div>
      </div>

      {/* channel sidebar */}
      <div className="flex flex-col shrink-0" style={{ width: '140px', background: '#2b2d31' }}>
        <div className="px-3 py-3 font-bold text-white" style={{ borderBottom: '1px solid #1e1f22' }}>
          RexOS 98
        </div>
        <div className="px-2 pt-3">
          <p className="px-1 mb-1 text-gray-400" style={{ fontSize: '10px' }}>TEXT CHANNELS</p>
          <div className="px-2 py-1 rounded flex items-center gap-1" style={{ background: '#404249', color: '#fff' }}>
            # site-guide
          </div>
        </div>
      </div>

      {/* main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center px-3 shrink-0" style={{ height: '36px', borderBottom: '1px solid #26272b', background: '#313338' }}>
          <span className="text-gray-400 mr-1">#</span>
          <span className="font-bold text-white">site-guide</span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          {messages.map((msg, i) => {
            const profile = profiles[msg.sender];
            const showHeader = i === 0 || messages[i - 1].sender !== msg.sender;

            return (
              <div key={msg.id} className={`flex gap-2 ${showHeader ? 'mt-3' : 'mt-0.5'}`}>
                {showHeader ? (
                  <Avatar profile={profile} size={32} onClick={() => setProfileOpen(msg.sender)} />
                ) : (
                  <div className="w-8 shrink-0" />
                )}

                <div className="min-w-0 flex-1">
                  {showHeader && (
                    <div className="flex items-baseline gap-2">
                      <ClickableName profile={profile} onClick={() => setProfileOpen(msg.sender)} />
                      <span className="text-gray-500" style={{ fontSize: '10px' }}>{msg.time}</span>
                    </div>
                  )}
                  <p className="leading-snug wrap-break-words">{msg.text}</p>

                  <div className="flex flex-wrap items-center gap-1 mt-1 relative">
                    {msg.reactions?.map((r) => (
                      <span
                        key={r.emoji}
                        onClick={() => toggleReaction(msg.id, r.emoji)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          padding: '1px 5px',
                          background: r.reacted ? 'rgba(88,101,242,0.35)' : '#43454b',
                          border: r.reacted ? '1px solid #5865f2' : 'none',
                          borderRadius: '6px',
                          fontSize: '10px',
                          lineHeight: '16px',
                          color: '#fff',
                          cursor: 'pointer',
                        }}
                      >
                        {r.emoji} {r.count}
                      </span>
                    ))}
                    <span
                      onClick={() => setPickerFor(pickerFor === msg.id ? null : msg.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '1px 5px',
                        background: '#43454b',
                        borderRadius: '6px',
                        fontSize: '10px',
                        lineHeight: '16px',
                        color: '#dcddde',
                        cursor: 'pointer',
                      }}
                    >
                      +
                    </span>

                    <AnimatePresence>
                      {pickerFor === msg.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          className="absolute top-full left-0 mt-1 flex gap-1 p-1 z-10"
                          style={{ background: '#1e1f22', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                        >
                          {quickEmojis.map((emoji) => (
                            <span
                              key={emoji}
                              onClick={() => toggleReaction(msg.id, emoji)}
                              className="hover:scale-125 transition-transform"
                              style={{ padding: '0 3px', cursor: 'pointer' }}
                            >
                              {emoji}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex items-center gap-2 mt-3 text-gray-400" style={{ fontSize: '10px' }}>
            <div className="w-8 flex justify-center">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                💬
              </motion.div>
            </div>
            <span>Rex is typing…</span>
          </div>
        </div>

        <div className="px-3 pb-3 shrink-0">
          <div className="px-3 py-2 text-gray-500" style={{ background: '#383a40', borderRadius: '8px' }}>
            Message #site-guide
          </div>
        </div>
      </div>

      {/* profile popout */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setProfileOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '260px', background: '#232428', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.6)' }}
            >
              <div style={{ height: '60px', background: profiles[profileOpen].banner }} />
              <div className="px-3 pb-3" style={{ marginTop: '-28px' }}>
                <div style={{ border: '4px solid #232428', borderRadius: '9999px', width: '56px', height: '56px' }}>
                  <Avatar profile={profiles[profileOpen]} size={48} onClick={() => {}} />
                </div>

                <p className="font-bold text-white mt-2">{profiles[profileOpen].name}</p>
                <p className="text-gray-400" style={{ fontSize: '10px' }}>{profiles[profileOpen].tag}</p>

                <div className="flex gap-1 mt-2">
                  {profiles[profileOpen].badges.map((b) => (
                    <span key={b} className="px-1.5 py-0.5" style={{ background: '#2b2d31', borderRadius: '4px', fontSize: '9px' }}>
                      {b}
                    </span>
                  ))}
                </div>

                <div className="mt-2 p-2" style={{ background: '#2b2d31', borderRadius: '4px' }}>
                  <p className="font-bold text-gray-300 mb-1" style={{ fontSize: '9px' }}>ABOUT ME</p>
                  <p className="leading-snug">{profiles[profileOpen].about}</p>
                </div>

                <p className="text-gray-500 mt-2" style={{ fontSize: '9px' }}>{profiles[profileOpen].joined}</p>

                <span
                  onClick={() => setProfileOpen(null)}
                  className="w-full mt-3 py-1.5 text-white font-bold flex items-center justify-center"
                  style={{ background: '#5865f2', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}