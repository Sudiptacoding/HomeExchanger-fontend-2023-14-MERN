import React from 'react';
import CountUp from 'react-countup';
import { Typewriter } from 'react-simple-typewriter';

const TypewriterComponents = () => {
    return (
        <div className='bg-hero bg-no-repeat bg-cover bg-center bg-fixed bg-[url("https://image.homeexchange.fr/images/home/2690913/1450035/1772485391781964.jpg?quality=80&height=350&keep-ratio=true")] '>
            <div className='bg-[#000000a8]  text-white flex items-center justify-center text-center'>
                <div>
                    <div>
                        <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                            <div class="mt-20 grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
                                <div>
                                    <h4 class="text-lg sm:text-xl font-semibold text-white dark:text-gray-200">Favorite criteria rate</h4>
                                    <p className='mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-white'>
                                        <CountUp className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-white"
                                            start={0}
                                            end={99.95}
                                            duration={2.75}
                                            separator=" "
                                            decimals={4}></CountUp>%</p>
                                    <p class="mt-1 text-white ">
                                        <Typewriter
                                            words={['Pet friendly homes', 'Home with outdoor space', 'Homes with a bicycle', 'Kid friendly homes!']}
                                            loop={Infinity}
                                            cursor
                                            cursorStyle='_'
                                            typeSpeed={100}
                                            deleteSpeed={100}
                                            delaySpeed={3000}
                                        />
                                    </p>
                                </div>
                                <div>
                                    <h4 class="text-lg sm:text-xl font-semibold text-white dark:text-gray-200">Houses based rate</h4>
                                    <p className='mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-white'>
                                        <CountUp className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-white"
                                            start={0}
                                            end={2000}
                                            duration={2.75}
                                            separator=" "
                                            decimals={4}></CountUp>%</p>
                                    <p class="mt-1 text-white ">
                                        <Typewriter
                                            words={['Homes with BBQ', 'Home with outdoor space', 'Homes with a bicycle', 'Kid friendly homes!']}
                                            loop={Infinity}
                                            cursor
                                            cursorStyle='_'
                                            typeSpeed={100}
                                            deleteSpeed={100}
                                            delaySpeed={3000}
                                        />
                                    </p>
                                </div>
                                <div>
                                    <h4 class="text-lg sm:text-xl font-semibold text-white dark:text-gray-200">Accuracy rate</h4>
                                    <p className='mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-white'>
                                        <CountUp className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-white"
                                            start={0}
                                            end={85}
                                            duration={2.75}
                                            separator=" "
                                            decimals={4}></CountUp>%</p>
                                    <p class="mt-1 text-white ">
                                        <Typewriter
                                            words={['Homes with swimming pool', 'Home with outdoor space', 'Homes with a bicycle', 'Kid friendly homes!']}
                                            loop={Infinity}
                                            cursor
                                            cursorStyle='_'
                                            typeSpeed={100}
                                            deleteSpeed={100}
                                            delaySpeed={3000}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypewriterComponents;