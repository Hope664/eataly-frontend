import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  UtensilsCrossed, 
  ShoppingBag, 
  BarChart3, 
  Users, 
  Settings, 
  HelpCircle, 
  Bell, 
  Plus, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Pencil, 
  Trash2, 
  ImagePlus 
} from 'lucide-react';

export default function MenuManagement() {
  const [activeCategory, setActiveCategory] = useState('All items');
  const [baroloActive, setBaroloActive] = useState(true);

  const categories = ['All items', 'Appetizers', 'Mains', 'Desserts', 'Wines'];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#1A2E22] font-sans antialiased">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-6 shrink-0">
        <div>
          {/* Logo */}
          <div className="mb-10">
            <h1 className="text-xl font-bold tracking-tight text-[#0F3821]">Eataly SaaS</h1>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Luxury Venue Management</p>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            <SidebarLink icon={<LayoutDashboard size={18} />} label="Dashboard" />
            <SidebarLink icon={<CalendarDays size={18} />} label="Reservations" />
            <SidebarLink icon={<UtensilsCrossed size={18} />} label="Menu" active />
            <SidebarLink icon={<ShoppingBag size={18} />} label="Orders" />
            <SidebarLink icon={<BarChart3 size={18} />} label="Analytics" />
            <SidebarLink icon={<Users size={18} />} label="Staff" />
          </nav>
        </div>

        {/* Bottom Nav Links */}
        <div className="space-y-1 border-t border-gray-100 pt-4">
          <SidebarLink icon={<Settings size={18} />} label="Settings" />
          <SidebarLink icon={<HelpCircle size={18} />} label="Support" />
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-10 max-w-7xl mx-auto w-full">
        
        {/* Top Header Row */}
        <header className="flex justify-end items-center gap-6 mb-8">
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#0F3821]">Admin Portal</p>
              <p className="text-xs text-gray-400">Eataly Milano</p>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" 
              alt="Admin Profile" 
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
          </div>
        </header>

        {/* Title Block & Add Button */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-[#0F3821] mb-2">Menu Management</h2>
            <p className="text-gray-500 font-medium">Curate your culinary offerings and seasonal specials.</p>
          </div>
          <button className="bg-[#0F3821] hover:bg-[#164d2f] text-white font-medium px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm transition-all text-sm">
            <Plus size={18} />
            Add New Dish
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all shrink-0 ${
                activeCategory === category 
                  ? 'bg-[#0F3821] text-white shadow-sm' 
                  : 'bg-[#EAECEB] text-[#55695D] hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* --- SECTION 1: FEATURED & SEASONAL --- */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#0F3821]">Featured & Seasonal</h3>
            <span className="text-[10px] tracking-wider font-bold text-gray-400 uppercase">Top Performers</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Featured Item Large Card (Spans 2 columns) */}
            <div className="lg:col-span-2 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="h-64 overflow-hidden relative bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" 
                  alt="Tagliatelle al Tartufo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="bg-[#E4F9EC] text-[#10B981] text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    Best Seller
                  </span>
                  <div className="flex justify-between items-start mt-3">
                    <h4 className="text-xl font-bold text-[#0F3821]">Tagliatelle al Tartufo</h4>
                    <span className="text-xl font-bold text-[#0F3821]">€34</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-xl">
                    Fresh house-made egg pasta with black winter truffles, Parmigiano Reggiano DOP, and organic butter.
                  </p>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Drink/Pairing Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="h-64 overflow-hidden bg-[#0B2115] flex items-center justify-center relative">
                {/* Simulated luxury dark ambient background from screenshot */}
                <img 
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80" 
                  alt="Barolo Riserva" 
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020C06] via-transparent to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="bg-[#E4F9EC] text-[#10B981] text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    Premium Pairing
                  </span>
                  <h4 className="text-xl font-bold text-[#0F3821] mt-3">Barolo Riserva 2016</h4>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Intense ruby red, complex aromas.
                  </p>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <span className="text-xl font-bold text-[#0F3821]">€110</span>
                  
                  {/* Custom Toggle Switch */}
                  <button 
                    onClick={() => setBaroloActive(!baroloActive)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${baroloActive ? 'bg-[#0F3821]' : 'bg-gray-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${baroloActive ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- SECTION 2: ALL APPETIZERS --- */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#0F3821]">All Appetizers</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50">
                <SlidersHorizontal size={14} /> Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50">
                <ArrowUpDown size={14} /> Sort
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Burrata Pugliese */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col p-3">
              <div className="h-44 rounded-xl overflow-hidden relative bg-gray-100 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1592417817098-8f3d6eb18865?auto=format&fit=crop&w=500&q=80" 
                  alt="Burrata Pugliese" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-[#0F3821]/80 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md">
                  €14
                </span>
              </div>
              <div className="px-1 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[#0F3821] text-base">Burrata Pugliese</h4>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    Fresh burrata cheese, cherry tomatoes, and basil pesto.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-50">
                  <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider">Available</span>
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600"><Pencil size={14} /></button>
                    <button className="p-1 text-gray-400 hover:text-gray-600"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Carpaccio di Manzo */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col p-3">
              <div className="h-44 rounded-xl overflow-hidden relative bg-gray-100 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1513135065346-a098a63a71ee?auto=format&fit=crop&w=500&q=80" 
                  alt="Carpaccio di Manzo" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-[#0F3821]/80 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md">
                  €18
                </span>
              </div>
              <div className="px-1 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[#0F3821] text-base">Carpaccio di Manzo</h4>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    Premium beef fillet, arugula, parmesan shavings, lemon.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-50">
                  <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider">Available</span>
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600"><Pencil size={14} /></button>
                    <button className="p-1 text-gray-400 hover:text-gray-600"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Placeholder File Drop Zone */}
            <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center bg-transparent group hover:border-gray-300 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#EAECEB] flex items-center justify-center text-[#55695D] mb-4 group-hover:bg-gray-200 transition-colors">
                <ImagePlus size={20} />
              </div>
              <p className="text-sm font-semibold text-[#0F3821]">Drag and drop dish image</p>
              <p className="text-xs text-gray-400 mt-1">or click to browse files</p>
              <button className="text-xs font-bold text-[#0F3821] underline mt-4 hover:text-black">
                Select from Library
              </button>
            </div>

            {/* Card 4: Out of Stock Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col p-3 opacity-90">
              <div className="h-44 rounded-xl overflow-hidden relative bg-gray-100 mb-4 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80" 
                  alt="Frito Misto" 
                  className="w-full h-full object-cover brightness-95"
                />
                {/* Out of stock overlay pill */}
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center p-4">
                  <span className="bg-[#EF4444] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md uppercase tracking-wider">
                    Out of Stock
                  </span>
                </div>
              </div>
              <div className="px-1 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-gray-400 text-base line-through">Fritto Misto</h4>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    Crispy calamari, shrimp, and seasonal vegetables.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-50">
                  <span className="text-[11px] font-bold text-[#EF4444] uppercase tracking-wider">Sold Out</span>
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-300 hover:text-gray-500"><Pencil size={14} /></button>
                    <button className="p-1 text-gray-300 hover:text-gray-500"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

// Reusable Inner Component for Sidebar items
function SidebarLink({ icon, label, active = false }) {
  return (
    <a 
      href="#" 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
        active 
          ? 'bg-[#EAECEB] text-[#0F3821] font-bold relative after:absolute after:right-0 after:top-1/4 after:h-1/2 after:w-1 after:bg-[#0F3821] after:rounded-l-md' 
          : 'text-[#55695D] hover:bg-gray-50 hover:text-[#0F3821]'
      }`}
    >
      <span className={active ? "text-[#0F3821]" : "text-[#88998E]"}>
        {icon}
      </span>
      {label}
    </a>
  );
}
