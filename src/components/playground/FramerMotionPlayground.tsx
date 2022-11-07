import { motion } from 'framer-motion'

export const FramerMotionPlayground = () => {
	return (
		<motion.div animate={{ scale: 1.5 }} initial={{ scale: 1 }}>
			Framer Motion Playground
		</motion.div>
	)
}
