import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, CambridgeLessonPlan } from '../types';
import { Send, Bot, User, Sparkles, Wand2, RefreshCw, MessageSquare } from 'lucide-react';
import { GRADE_8_CURRICULUM_UNITS } from '../data/curriculumData';

interface TeacherChatPanelProps {
  currentPlan: CambridgeLessonPlan | null;
  onPlanUpdated: (newPlan: CambridgeLessonPlan) => void;
  onOpenSelector: () => void;
}

export const TeacherChatPanel: React.FC<TeacherChatPanelProps> = ({
  currentPlan,
  onPlanUpdated,
  onOpenSelector,
}) => {
  // Required initial interaction prompt from the system instructions
  const INITIAL_PROMPT =
    'Please share the Chapter Name/Number and Grade Level you would like to plan for today, along with any specific Template preferences if not already provided in the context.';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'model',
      content: INITIAL_PROMPT,
      timestamp: Date.now(),
      suggestedPrompts: [
        'Unit 3: Living Beings - Plant vs Animal Cells (Onion Mount)',
        'Unit 6: Force and Motion - Principle of Lever (P = F/A & Levers)',
        'Unit 10: Materials in Daily Life - Acids & Bases with Wood Ash',
        'Unit 4: Biodiversity - Quadrat Sampling on Grassland',
        'Unit 8: Electricity - 3-Pin Plug Wiring & Domestic Safety',
        'Unit 5: Life Process - Seed Germination & Dispersal'
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Check if the user is asking to plan a specific chapter
      const lower = messageContent.toLowerCase();
      const unitMatch = lower.match(/unit\s*(\d+)|chapter\s*(\d+)/i);
      const isPlanningIntent =
        lower.includes('plan') ||
        lower.includes('create') ||
        lower.includes('generate') ||
        lower.includes('lesson') ||
        Boolean(unitMatch);

      if (isPlanningIntent && unitMatch) {
        const unitNum = parseInt(unitMatch[1] || unitMatch[2], 10);
        const matchingUnit =
          GRADE_8_CURRICULUM_UNITS.find((u) => u.unitNumber === unitNum) ||
          GRADE_8_CURRICULUM_UNITS[0];

        // Find relevant topic if mentioned
        let matchedTopic = matchingUnit.topics[0];
        for (const t of matchingUnit.topics) {
          const tLower = t.toLowerCase();
          const words = tLower.split(/[\s,:-]+/);
          if (words.some((w) => w.length > 3 && lower.includes(w))) {
            matchedTopic = t;
            break;
          }
        }

        // Call the structured lesson plan generator
        const genRes = await fetch('/api/generate-lesson-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            unitNumber: matchingUnit.unitNumber,
            topic: matchedTopic,
            classGrade: 'Grade 8',
            durationMinutes: 45,
            specificFocus: messageContent,
            lowResourceFocus: true,
          }),
        });

        if (genRes.ok) {
          const genData = await genRes.json();
          if (genData.lessonPlan) {
            onPlanUpdated(genData.lessonPlan);
            setMessages((prev) => [
              ...prev,
              {
                id: `ai-${Date.now()}`,
                role: 'model',
                content: `I have generated a new lesson plan strictly adhering to the Cambridge Lower Secondary template for **Unit ${matchingUnit.unitNumber}: ${matchingUnit.title}** (${matchedTopic}).\n\n- **Target Class:** Grade 8\n- **Learning Outcomes:** Aligned directly to official curriculum LOs (${genData.lessonPlan.learningObjectives.join(', ')})\n- **Hands-On STEAM Lab:** Structured around low-cost, locally available classroom materials.\n\nThe interactive document on the right has been updated with the full lesson plan, plan table, reflection questions, and summary evaluations.`,
                timestamp: Date.now(),
                suggestedPrompts: [
                  'Add 10 more minutes to the hands-on inquiry',
                  'Adapt for zero-budget rural classroom materials',
                  'Generate alternative formative assessment questions',
                ],
              },
            ]);
            setLoading(false);
            return;
          }
        }
      }

      // Standard conversational chat with the curriculum designer persona
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          currentLessonPlan: currentPlan,
        }),
      });

      if (!chatRes.ok) {
        throw new Error('Chat service temporarily unavailable');
      }

      const chatData = await chatRes.json();
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'model',
          content: chatData.text || 'I have reviewed your request.',
          timestamp: Date.now(),
          suggestedPrompts: [
            'Generate a new lesson plan for Unit 6 (Levers)',
            'Generate a new lesson plan for Unit 10 (Acids & Bases)',
            'Generate a new lesson plan for Unit 4 (Biodiversity)',
          ],
        },
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'model',
          content:
            'I encountered an issue processing that request. You can also click the "Select Chapter" button at the top to choose any unit directly.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent flex flex-col h-[650px] lg:h-[750px] overflow-hidden">
      {/* Chat Sub-header */}
      <div className="p-3.5 border-b border-black/[0.06] bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.05] flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-[#1d1d1f] leading-tight">
              Curriculum AI Specialist
            </h3>
            <span className="text-[11px] text-[#86868b]">
              Textbook-grounded • Nepal CDC & Cambridge
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenSelector}
          className="text-[12px] font-medium text-[#0071e3] hover:bg-[#0071e3]/5 bg-transparent px-2.5 py-1 rounded-full border border-[#0071e3]/20 transition-all inline-flex items-center gap-1 cursor-pointer active:scale-[0.98]"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>All Units</span>
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto space-y-3.5 text-[13px] pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                m.role === 'user'
                  ? 'bg-[#0071e3] text-white'
                  : 'bg-white text-[#0071e3] border border-black/[0.06] shadow-2xs'
              }`}
            >
              {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-[#0071e3] text-white shadow-[0_2px_8px_rgba(0,113,227,0.25)] rounded-tr-sm'
                  : 'bg-white text-[#1d1d1f] shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.05] rounded-tl-sm'
              }`}
            >
              <p>{m.content}</p>

              {/* Quick Prompt Chips */}
              {m.suggestedPrompts && m.suggestedPrompts.length > 0 && (
                <div className="mt-3 pt-3 border-t border-black/[0.06] flex flex-wrap gap-1.5">
                  <span className="text-[10px] uppercase font-semibold text-[#86868b] block w-full mb-0.5 tracking-wider">
                    Quick Suggestions:
                  </span>
                  {m.suggestedPrompts.map((sPrompt, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => handleSendMessage(sPrompt)}
                      disabled={loading}
                      className="text-left text-[11px] bg-[#f5f5f7] hover:bg-white text-[#1d1d1f] font-medium px-2.5 py-1 rounded-full border border-black/[0.06] shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
                    >
                      {sPrompt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div className="bg-white border border-black/[0.05] rounded-2xl rounded-tl-sm p-3.5 text-[12px] text-[#6e6e73] flex items-center gap-2.5 shadow-2xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0071e3]" />
              <span>Synthesizing CDC textbook context and Cambridge template...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar: Apple Pill Style */}
      <div className="pt-3 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-white rounded-full border border-black/[0.1] shadow-[0_2px_8px_rgba(0,0,0,0.04)] pl-4 pr-1.5 py-1.5 focus-within:ring-2 focus-within:ring-[#0071e3]/30 focus-within:border-[#0071e3] transition-all"
        >
          <input
            id="input-teacher-chat"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="e.g. Plan Unit 6 Levers with ruler & coins..."
            className="flex-1 text-[13px] bg-transparent text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none"
          />
          <button
            id="btn-send-teacher-chat"
            type="submit"
            disabled={loading || !input.trim()}
            className="w-8 h-8 flex items-center justify-center bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full transition-all disabled:opacity-30 disabled:hover:bg-[#0071e3] cursor-pointer active:scale-95 shadow-2xs"
            title="Send Message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
