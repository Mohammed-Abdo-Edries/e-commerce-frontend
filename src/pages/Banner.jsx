import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion'
const variants = {
    animate: {
        transition: {
            delayChildren: 0.4,
            staggerChildren: 0.1
        }
    }
};
const letterAnimation = {
    initial: { y: 400 },
    animate: {
        y: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 1,
        }
    }
};
const Banner = () => {
    const [playMarquee, setPlayMarquee] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setPlayMarquee(true)
        }, 2000);
    }, []);
    return (
        <motion.div className="banner" variants={variants} animate='animate'>
            <BannerRowTop title={"Brand New"} />
            <BannerRowCenter title={"collections"} playMarquee={playMarquee} />
        </motion.div>
    )
};
const AnimatedLetters = ({ title, disabled }) => {
    <motion.span variants={disabled ? null : variants} initial='initial' animate='animate'>
        {[...title].map((letter) => (
            <motion.span variants={disabled ? null : letterAnimation} >{letter}</motion.span>
        ))}
    </motion.span>
}
const BannerRowTop = ({ title }) => {
    return (
        <div>
            <AnimatedLetters title={title} />
        </div>
    )
}
const BannerRowCenter = ({ title, playMarquee }) => {
    return (
        <div className={`${playMarquee && "animate"}`}>
            <motion.div initial={{ y: 310 }} animate={{ y: 0 }} transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1 }}
                className='marquee__inner'>
                <AnimatedLetters title={title} disabled />
                <AnimatedLetters title={title} />
                <AnimatedLetters title={title} disabled />
                <AnimatedLetters title={title} disabled />
            </motion.div>
        </div>
    )
}
export default Banner;