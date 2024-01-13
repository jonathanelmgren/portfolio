import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TDriversLogGenerator } from './types';

export const WeekDays: React.FC<{ index: number, weeks: number[] }> = ({ index, weeks }) => {
    const form = useFormContext<TDriversLogGenerator>();

    return (
        <div className='flex gap-2 flex-wrap'>
            {weeks.map((week) => (
                <FormField
                    key={week}
                    control={form.control}
                    name={`trips.${index}.ignoreWeeksOfMonth`}
                    render={({ field }) => {
                        const isChecked = field.value?.includes(week);
                        return (
                            <FormItem>
                                <FormControl>
                                    <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...field.value, week])
                                                : field.onChange(
                                                    field.value?.filter(
                                                        (value) => value !== week
                                                    )
                                                )
                                        }}
                                        className="hidden"
                                    />
                                </FormControl>
                                <FormLabel className={cn('cursor-pointer font-normal block p-2 border-[1px] rounded-md', isChecked && 'border-primary')}>
                                    {week}
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
            ))}
        </div>
    )
}
