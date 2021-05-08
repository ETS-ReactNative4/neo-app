import React, {
	ReactNode,
	FunctionComponent,
	ReactElement
} from 'react'
// import { Box, BoxProps } from '../box'
// import { Pressable, PressableProps } from '../pressable'
// import { Text, TextProps } from '../text'
import { Checkmark, Included } from '@pyt/icons'
import {
	InputText,
	InputTextProps,
	Text,
	TextProps,
	Box,
	BoxProps,
	Pressable, PressableProps
  } from '@pyt/micros';
export interface CheckboxOptionProps {
	label: string
	value: string | number
}

export interface CheckboxProps extends BoxProps {
	title?: string | ReactNode
	titleProps?: TextProps
	onSelect: (option: CheckboxOptionProps) => unknown
	onUnSelect: (option: CheckboxOptionProps) => unknown
	options: CheckboxOptionProps[]
	selectedOptions?: CheckboxOptionProps[]
	activeIconColor?: string
	iconSize?: number
	rowProps?: PressableProps
	labelProps?: TextProps
	ItemSeparator?: ReactElement
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({
	title,
	titleProps,
	fontFamily,
	iconSize,
	activeIconColor,
	onSelect = () => null,
	onUnSelect = () => null,
	options = [],
	selectedOptions = [],
	rowProps = {},
	labelProps = {},
	ItemSeparator,
	...restProps
}) => {
	const selectedIconColor = activeIconColor || '#7E4FC3'
	return (
		<Box {...restProps}>
			{title ? (
				<Text
					fontSize={15}
					fontWeight={'700'}
					fontFamily={fontFamily}
					marginBottom={18}
					{...titleProps}
				>
					{title}
				</Text>
			) : null}
			{options.map((option, optionIndex) => {
				const isSelected = !!selectedOptions.find(
					val => option.value === val.value
				)

				const onPress = isSelected
					? () => onUnSelect(option)
					: () => onSelect(option)

				return (
					<>
						<Pressable
							flexDirection="row"
							justifyContent="space-between"
							alignItems="center"
							onPress={onPress}
							{...rowProps}
							key={`${optionIndex}-option`}
						>
							<Text
								fontFamily={fontFamily}
								color="#333333"
								fontSize={15}
								lineHeight={20}
								{...labelProps}
							>
								{option.label}
							</Text>
							<Box
								width={iconSize || 16}
								height={iconSize || 16}
								alignItems="center"
								justifyContent="center"
								borderWidth={2}
								borderRadius={2}
								borderColor={isSelected ? selectedIconColor : '#B7B7B7'}
								backgroundColor={isSelected ? selectedIconColor : 'transparent'}
							>
								<Included fill="#FFFFFF" />
							</Box>
						</Pressable>
						{optionIndex !== options.length - 1
							? ItemSeparator || <Box marginVertical={12} />
							: null}
					</>
				)
			})}
		</Box>
	)
}
