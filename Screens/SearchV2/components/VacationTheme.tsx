import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {CONSTANT_hotelIcon} from '../../../constants/imageAssets';
import {SearchSection} from './Section';
import {ThemeCard} from './ThemeCard';
type VacationThemePropType = {
  title: string;
  list: [];
  onClick: ({searchQuery}: {searchQuery: string}) => unknown;
};

export const VacationTheme = ({
  list = [],
  title,
  onClick,
}: VacationThemePropType) => {
  return (
    <SearchSection title={title}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        horizontal
        style={styles.container}>
        {list.map(({image, title, searchQuery}, index) => (
          <ThemeCard
            title={title}
            image={image}
            containerStyle={{marginRight: index !== list.length - 1 ? 16 : 0}}
            action={() => onClick({searchQuery})}
          />
        ))}
        {/* <ThemeCard
          title="Honeymoon"
          icon={CONSTANT_hotelIcon}
          containerStyle={{marginRight: 16}}
        />
        <ThemeCard
          title="Islands"
          image="https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        />
         <ThemeCard
          title="Honeymoon"
          icon={CONSTANT_hotelIcon}
          containerStyle={{marginRight: 16}}
        />
        <ThemeCard
          title="Islands"
          image="https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        />
         <ThemeCard
          title="Honeymoon"
          icon={CONSTANT_hotelIcon}
          containerStyle={{marginRight: 16}}
        />
        <ThemeCard
          title="Islands"
          image="https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        /> */}
      </ScrollView>
    </SearchSection>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginRight: -16,
  },
});
