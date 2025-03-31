
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Gravity', 'system-ui', 'sans-serif'],
				display: ['Bebas Neue', 'SF Pro Display', 'system-ui', 'sans-serif'],
			},
			colors: {
				cv: {
					black: '#000000',
					darkgray: '#121212',
					gray: '#1A1A1A',
					lightgray: '#333333',
					white: '#FFFFFF',
					accent: '#9b87f5',  // Changed from orange to purple
					purple: {
						DEFAULT: '#9b87f5',
						dark: '#7E69AB',
						light: '#b6a8f8',
					},
					secondary: '#4A4A4A',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				editor: {
					toolbar: '#1A1A1A',
					panel: '#121212',
					border: '#333333',
					surface: '#1A1A1A',
					highlight: '#2A2A2A',
					accent: '#9b87f5',  // Changed from orange to purple
					text: '#FFFFFF',
					muted: '#999999',
				},
				theme: {
					primary: '#9b87f5',  // Changed from orange to purple
					secondary: '#4A4A4A',
					accent: '#b6a8f8',  // Changed from orange to purple light
					success: '#34C759',
					warning: '#FF3B30',
					neutral: '#8E8E93',
					light: '#F2F2F7',
					dark: '#000000',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				"fade-out": {
					"0%": { opacity: "1", transform: "translateY(0)" },
					"100%": { opacity: "0", transform: "translateY(10px)" }
				},
				"scale-in": {
					"0%": { transform: "scale(0.97)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" }
				},
				"slide-in": {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" }
				},
				"slide-in-right": {
					"0%": { transform: "translateX(20px)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" }
				},
				"pulse-subtle": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.8" }
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-5px)" }
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.3s ease-out",
				"fade-out": "fade-out 0.3s ease-out",
				"scale-in": "scale-in 0.3s ease-out",
				"slide-in": "slide-in 0.3s ease-out",
				"slide-in-right": "slide-in-right 0.3s ease-out",
				"pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
				"float": "float 3s ease-in-out infinite",
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'glass-lg': '0 8px 32px rgba(0, 0, 0, 0.1)',
				'subtle': '0 2px 10px rgba(0, 0, 0, 0.05)',
				'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
				'elevated': '0 10px 30px rgba(0, 0, 0, 0.12)',
			},
			backdropBlur: {
				'xs': '2px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
