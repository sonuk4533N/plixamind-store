import React from 'react';
import { Category } from '../types';
import { 
  Sparkles, 
  LayoutGrid, 
  BookOpen, 
  Palette, 
  Terminal, 
  Briefcase 
} from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'notion-systems':
        return <LayoutGrid className="w-4 h-4" />;
      case 'ebooks-playbooks':
        return <BookOpen className="w-4 h-4" />;
      case 'design-assets':
        return <Palette className="w-4 h-4" />;
      case 'developer-toolkits':
        return <Terminal className="w-4 h-4" />;
      case 'freelancer-bundles':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max">
        {/* All Products Button */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 shadow-md shadow-neon/15 font-bold'
              : 'bg-charcoal-900/90 text-slate-300 border border-white/10 hover:border-purple-500/40 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>All Products</span>
        </button>

        {/* Individual Category Buttons */}
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 shadow-md shadow-neon/15 font-bold'
                  : 'bg-charcoal-900/90 text-slate-300 border border-white/10 hover:border-purple-500/40 hover:text-white'
              }`}
            >
              {getIcon(cat.slug)}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
