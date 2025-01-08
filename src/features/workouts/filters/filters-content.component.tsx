import { PaddedScrollView } from "@/src/components/ui/layout/padded-scroll-view/padded-scroll-view.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { MuscleGroupFilters } from "./muscle-group-filters/muscle-group-filters.component";
import { EquipmentFilters } from "./equipment-filters/equipment-filters.component";

export const FiltersContent = () => {
  return (
    <PaddedScrollView>
      <MuscleGroupFilters />

      <VerticalSpacing size={8} />

      <EquipmentFilters />

      <VerticalSpacing size={8} />
    </PaddedScrollView>
  );
};
