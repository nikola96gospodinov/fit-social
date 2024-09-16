import { PaddedScrollView } from "@/components/ui/layout/padded-scroll-view/padded-scroll-view.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { BodyPartAndTargetMuscleFilters } from "@/features/filters/body-part-and-target-muscle-filters/body-part-and-target-muscle-filters.component";
import { EquipmentFilters } from "@/features/filters/equipment-filters/equipment-filters.component";

const Filters = () => {
  return (
    <PaddedScrollView>
      <BodyPartAndTargetMuscleFilters />

      <VerticalSpacing size={8} />

      <EquipmentFilters />

      <VerticalSpacing size={8} />
    </PaddedScrollView>
  );
};

export default Filters;
