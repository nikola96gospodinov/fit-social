import { PaddedScrollView } from "@/components/ui/layout/padded-scroll-view/padded-scroll-view.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { BodyPartAndTargetMuscleFilters } from "./body-part-and-target-muscle-filters/body-part-and-target-muscle-filters.component";
import { EquipmentFilters } from "./equipment-filters/equipment-filters.component";

export const FiltersContent = () => {
  return (
    <PaddedScrollView>
      <BodyPartAndTargetMuscleFilters />

      <VerticalSpacing size={8} />

      <EquipmentFilters />

      <VerticalSpacing size={8} />
    </PaddedScrollView>
  );
};
