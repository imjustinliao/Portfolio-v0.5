import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import thumbnail from './thumbnails/WIT.png'

const TwitterPost = () => (
    <div className="w-full my-8 flex justify-center">
        <div 
            onClick={() => window.open('https://twitter.com/AviSchiffmann/status/2009158742596522386', '_blank')}
            className="border border-[rgba(255,255,255,0.1)] rounded-xl p-6 max-w-[500px] w-full bg-black/40 backdrop-blur-sm hover:bg-black/50 transition-colors cursor-pointer"
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                     <img 
                        src="https://pbs.twimg.com/profile_images/1955058917387689984/8UVGB5Bz_400x400.jpg" 
                        alt="Avi Schiffmann" 
                        className="w-10 h-10 rounded-full bg-gray-600 object-cover"
                     />
                     <div className="flex flex-col">
                         <span className="text-white font-bold text-[15px] hover:underline">Avi Schiffmann</span>
                         <span className="text-gray-500 text-[14px]">@AviSchiffmann</span>
                     </div>
                </div>
                <div className="text-gray-500">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                </div>
            </div>
            <div className="mt-4 text-white text-[15px] leading-snug">
                I dislike the aesthetic of The New World. It mostly looks unfortunate. The PNW is the only real place left. Everything else is tacky & fake. Filled with pastel colors, like Japan.
                <br/><br/>
                I find myself constantly shepherded around liminal spaces where nothing is real. I just spoke at <span className="text-[#1D9BF0] hover:underline">Show more</span>
            </div>

            {/* Quoted Tweet / Thread Reply */}
            <div className="mt-3 border border-[rgba(255,255,255,0.15)] rounded-xl p-3 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                     <img 
                        src="https://pbs.twimg.com/profile_images/1955058917387689984/8UVGB5Bz_400x400.jpg" 
                        alt="Avi" 
                        className="w-5 h-5 rounded-full bg-gray-600 object-cover"
                     />
                     <span className="text-white font-bold text-[14px]">Avi</span>
                     <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-4 h-4 text-[#1D9BF0] fill-current"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.237 1.4-1.272.65-2.147 2.02-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>
                     <span className="text-gray-500 text-[14px]">@AviSchiffmann</span>
                </div>
                <div className="text-gray-500 text-[14px] mb-2">
                    Replying to <span className="text-[#1D9BF0]">@AviSchiffmann</span>
                </div>
                <div className="text-white text-[15px] leading-snug">
                    A new American empire is assembling, for some reason. Self driving cars are dropping friends off at my house. AI slop art is invading the bathrooms of random restaurants in the middle of nowhere. New drastic formula 1 regs. Ozempic making everyone look old. I’m addicted to Reels.
                </div>
            </div>

             <div className="mt-4 text-gray-500 text-[15px] flex items-center gap-1">
                <span>11:02 PM</span>
                <span>·</span>
                <span>Jan 7, 2026</span>
            </div>
        </div>
    </div>
)

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="flex flex-col gap-6 w-full fade-in-section">
        <h2 className="text-2xl md:text-3xl text-white font-semibold mt-8 mb-2">
            {title}
        </h2>
        <div className="text-lg md:text-[20px] text-[rgba(255,255,255,0.85)] leading-[1.8] font-light flex flex-col gap-6">
            {children}
        </div>
    </div>
)

export default function WIT() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <article className="w-full min-h-screen flex flex-col items-center pt-[150px] pb-[100px] relative px-6 md:px-0">
      
      {/* Article Header */}
      <div className="w-full max-w-[800px] mb-12">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[#C9C9C9] font-mono text-sm mb-6">
          <span>Writing</span>
          <span>•</span>
          <span>World Reflection</span>
          <span>•</span>
          <span>Jan 10, 2026</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
          Why I’m Techno-Optimistic
        </h1>

        <div className="flex items-center gap-2 text-[rgba(255,255,255,0.6)] font-mono text-sm mb-12">
            <span>For: Founders, Builders, VCs</span>
        </div>

        {/* Thumbnail */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 bg-white/5 border border-white/10 relative group">
           <img 
              src={thumbnail}
              alt="Essay Thumbnail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
           />
        </div>
        
        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 mb-12" />

        {/* Introduction */}
        <div className="text-lg md:text-[20px] text-[rgba(255,255,255,0.85)] leading-[1.8] font-light mb-8">
            <p>
                After reading Avi Schiffmann's recent post, I took time to think about technological evolution, what it means, how it changes us, and what it implies for the future of humanity. I agree with some of the emotions behind it, but I disagree with where that logic ends up.
            </p>
            <p className="mt-6">
                If you haven’t read his posts, please do so to understand the full context.
            </p>
        </div>

        <TwitterPost />
      </div>

      {/* Content Body */}
      <div className="w-full max-w-[800px] flex flex-col gap-12">
        
        <Section title="Perfection Without Meaning">
            <p>A artificial world like Shanghai is not an ideal state. When everything is optimized to look perfect, nothing feels real.</p>
            <p>But that feeling is not proof that reality is gone. It’s a signal that we are living inside environments designed for surface-level impressions rather than deep meaning. What feels fake is often what is optimized, not what is true.</p>
        </Section>

        <Section title="Moving Forward Is Inevitable">
            <p>Moving forward has always been the natural progression. We cannot go back to the past.</p>
            <p>Staying stagnant can never happen. The world is filled with new problems and new ideas. The transition from pre-agriculture to post-agriculture was going to happen, and it did make our lives better in many ways.</p>
            <p>The idea of staying nostalgic is comforting, but it collapses under reality. For most people, remaining stagnant is impossible. New ideas keep showing up, because creation is inevitable.</p>
            <p>Civilization works when the first human decided to create because of a problem or someone's. That can happen in every place of the world, which means multiple creations can happen across time. People create a solution, then that solution becomes the new baseline.</p>
            <p>Another path is curiosity. We explore and experiment. Someone discovers something, someone finds a pattern, and new stuff is formed. At first the radius is small, like only the creator knows. Since humans live in tribes, ideas spread across people and their descendants.</p>
            <p>This network effect is quick. When a newer generation sees it, or someone nearby sees it, they create something on top of it.</p>
            <p>Even the most isolated societies still evolve. We have no evidence that any group can remain untouched by change forever. It feels like a built-in human function: we are curious, we see problems, we imagine, we create, and the cycle repeats.</p>
            <p>Without exploration and advancement, there are no ups and downs. People get bored. Life starts to feel meaningless.</p>
        </Section>

        <Section title="Why Nothing Feels Real Yet">
            <p>Technology isn’t good enough at simulating experiences of the past, the present, or anything at all. But when we get to the point where we can’t differentiate whether something is real or not, what would the future generation feel?</p>
            <p>Part of the difference is that our generation carries past emotions that we can’t get over. We often think genuineness matters because we experienced a world where it did. But if technology can produce the same result without us knowing, would it still matter?</p>
            <p>Even the things people call fake, like polyester design, are still expressions. They don’t feel real partly because the technology and craftsmanship aren’t there yet. We judge quickly based on what hits us immediately, rather than thinking deeper about what the era is evolving into.</p>
        </Section>

        <Section title="Progress Creates Discovery">
            <p>Progress creates slop, but it also creates discovery.</p>
            <p>AI allows more people to create. Even the output people call slop still contains creative components, but most of it lacks craftsmanship and thinking, and that’s why it feels fake and sloppy.</p>
            <p>The point is that it increases the possibility of people discovering new things that previously only a small number of specialists could. It lowers the barrier to creation and discovery. A person with a laptop can now code projects, prototype products, generate visuals, explore design directions, learn faster, and ship experiments that used to require a full team or years of training.</p>
            <p>Technology unifies us. It allows us to express thoughts and build things. These tools can give us space to think, and help us discover how we and the world react. We are inherently curious.</p>
        </Section>

        <Section title="The Incentives Are Broken">
            <p>The real problem is not technology. It is what we reward.</p>
            <p>In every product and brand, there is a ratio of creation to manipulation. Creation means the product gives you power to build, discover, and become more. Manipulation means it uses psychology and dark patterns to keep you scrolling, comparing, and addicted. Unfortunately, the consumer app space is currently more focused on manipulation than creation.</p>
            <p>Meanwhile, the economic conditions make it harder for young people to become independent by paycheck. When survival and status feel urgent, people crave short-term rewards. Our generation started optimizing for money and fame, which is why we have the get-rich-quick sentiments within startups and consumer apps.</p>
            <p>That incentive shift changes what gets built. It pulls founders toward tactics that scale attention, not craftsmanship that compounds value. They prioritize short-term rewards, money, and status over long-term vision and solving the root problem. Often time, they are not solving their own problems.</p>
            <p>These are businessmen, not innovators.</p>
            <p>Many founders build products for views, not for value. The product does not provide real value beyond perceived value. There is no discovery or creation component in it.</p>
            <p>This becomes a vicious cycle, especially as AI advances in the wrong hands. People are not willing to endure hardship or hold a long-term vision. These slop apps can easily capitalize on people's insecurities through UGC, slideshows, and clips.</p>
            <p>That is how you end up with products designed around dopamine loops, keeping people addicted and depressed. You can see it clearly in what Instagram has become.</p>
            <p>The shift is cultural. Purpose and passion get replaced by short-term results. Instead of building something truly great like iPhone, Tesla...etc, it becomes about what grows fast.</p>
            <p>If technology keeps leaning toward manipulation instead of creation, then yes, humanity may be over in the sense that the top controls the rest, and nothing good is left.</p>
        </Section>

        <Section title="Craftsmanship, Truth, & High Delta">
            <p>Technology must combine with human creation. Craftsmanship matters; effort matters; quality matters. We should reject laziness when building.</p>
            <p>If there is no source of truth, everything collapses into influence games. We need standards that protect truth and real creation.</p>
            <p>The technology worth building must be high delta. It must redefine our lives. It must keep evolving. Most importantly, it must lower the barrier to creation and discovery.</p>
            <p>Real technology is not a fixed utility. It’s a platform. Computers let people communicate, discover new things, and build their own projects. The value exceeds the perceived value, because the user can create countless outcomes on top of it, not just use one predefined function.</p>
            <p>And that’s why we must hit a self-realization phase. If people don’t realize what truly matters to them, they will keep falling for manipulation. They will doomscroll. They becomes consumers than creators. They will trade purpose for short-term rewards without even noticing.</p>
            <p>People have to realize what truly matters to them: genuine ideas, art, and real thought. We are still in a transition phase where people are controlled by technology instead of understanding it and using it with intention.</p>
        </Section>

        <Section title="We Must Adapt">
             <p>The pace and scale are different now. It feels like we will reach singularity at some point.</p>
             <p>This is not just about AI. Every major wave changed the environment, the internet age, industrialization, and now this. No matter what technology it is, it becomes the world we live in, and it’s something we must adapt to.</p>
             <p>AI makes it more extreme. The pace is faster, the scale is larger, and what used to take years can happen in weeks or days. But as long as we are advancing toward a higher level civilization, both in technology and consciousness, our purpose doesn’t disappear. It becomes clearer.</p>
             <p>I believe the future will belong to only a few companies that keep delivering real, innovative value. In all aspects. Is that a bad thing? No. Life is about exploration. It’s an aesthetic of experiences and experimentation.</p>
             <p>Again, without exploration and advancement, there are no ups and downs.</p>
        </Section>

        <Section title="Spirituality Is The Missing Layer">
            <p>The rudimentary state of humanity is that we don’t advance or think deeply, especially spiritually.</p>
            <p>We should explore spiritually. Reconnect ourselves back to universal consciousness. Self exploration is about pursuing truth. We will never reach a final truth, but we can get closer to it.</p>
            <p>Spirituality can be achieved through technology or through a lone journey. The lone journey might be the hardest of all. I still don’t know how, which is why I'm starting to write out any ideas and thoughts.</p>
            <p>To some people this sounds scary, because we are indulged in current reality. But you cannot get past that fear until your consciousness and awareness level increases and you start seeing the bigger picture of humanity: EDOM.</p>
        </Section>
        
        <Section title="My Optimism Towards The Future">
            <p>Mars is an option, but Earth is still our core.</p>
            <p>My optimistic imagination of the world is a hybrid of human freedom creation and AI. Peaceful and exciting exploration of space, or even parallel universes. The most important thing is that we can communicate at a spiritual level, where consciousness and intelligence advance further, and what we imagine becomes reality.</p>
            <p>We should work toward that. If we trust our visions, at minimum we can agree we want a better world for future generations, where humanity keeps marking universal feats.</p>
            <p>Humanity must adapt. Nostalgic ages can be experienced through technology, because we cannot move back in time and we cannot stay stagnant. Technology is the option.</p>
        </Section>

        <Section title="What's Next">
            <p>Having no answer to uncertainty is what makes the world real.</p>
            <p>If permanent longevity become real, life will be so much more exciting, because we’ll have the time to actually build what we believe in, explore deeper, and discover at a scale that our current lifespan can’t reach.</p>
        </Section>

        {/* Closing Quote */}
        <div className="w-full flex justify-start my-12 pl-8 border-l-2 border-white/30">
             <div className="flex flex-col gap-4">
                 <p className="text-2xl md:text-3xl italic font-light text-white leading-relaxed">
                     "It is not the technology, but ourselves that destroyed us."
                 </p>
                 <p className="text-lg text-[rgba(255,255,255,0.6)] font-mono">
                     - Justin Liao, 1.10.26
                 </p>
             </div>
        </div>

        {/* Final Statement */}
        <div className="flex flex-col gap-2 mb-24">
             <p className="text-lg md:text-[20px] text-[rgba(255,255,255,0.85)] leading-[1.8] font-light">The technology is beautiful.</p>
             <p className="text-lg md:text-[20px] text-[rgba(255,255,255,0.85)] leading-[1.8] font-light">Our future is bright.</p>
        </div>

      </div>
    </article>
  )
}
